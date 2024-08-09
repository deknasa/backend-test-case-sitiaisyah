const BookLoanData = require("../models/index").BookLoanData
const Book = require('../models/index').Book
const Member = require("../models/index").Member

exports.borrow = async (req, res) => {
    const { book_code, borrow_date } = req.body
    const member_id = req.id

    await Book.findOne({ 
        where: { code: book_code },
        include: [{ model: BookLoanData, as: "book_loan_data" }] 
    })
    .then(book => {        
        const book_id = book.id
        if (!book) {
            return res.status(400).send({ message: "Book not found!" })
        }
        if (book.book_loan_data.length == 1) {
            return res.status(401).send({ message: "The book has been borrowed by another member, please borrow another book!" })
        }
        if (book.stock <= 0) {
            return res.status(402).send({ message: "Book out of stock!"})
        }

        Member.findOne({  
            where: {id: member_id},
            include: [{ model: BookLoanData, as: "book_loan_data" }] 
        })
        .then(member => {            
            const penaltyLimitDate = new Date(member.penaltyLimit).getDate()
            const currentDate = new Date(borrow_date).getDate()
            const canBorrow = new Date(new Date(member.penaltyLimit).setDate(member.penaltyLimit.getDate() + 1));
            
            if (currentDate <= penaltyLimitDate) {
                return res.status(404).send(`You are still in the penalty period and can only borrow again on the due date ${canBorrow}. `)
            }
            member.penaltyLimit = "null"
            member.penaltyStatus = "off"
            member.save()

            if (member.book_loan_data.length >=2) {
                return res.status(402).send({ message: "you can't borrow more than 2 books!" })
            }
            if (member.penaltyStatus != "off") {
                return res.status(403).send({ message: "You can't borrow books because they are in penalty period!" })
            }
            
            return BookLoanData.create({member_id: member_id, book_id: book_id, book_code: book_code, createdAt: borrow_date})
            .then(resp => {
                book.stock = book.stock - 1
                book.save() 
 
                res.status(201).send({  
                    data: {
                        member_id: resp.member_id,
                        book_code: book_code,
                        borrow_date: resp.createdAt,
                    },
                })
            }).catch(e => {
                res.status(501).send({ 
                    message: "Failed to borrow book!",
                    e: e.message
                })
            })
        }).catch(e => {
            res.status(503).send({ 
                message: "Something wrong with the member!",
                e: e.message
            })
        })
    }).catch(e => {
        res.status(504).send({ message: "INTERNAL SERVER ERROR", error: e.message })
    })
}

exports.returnBook = async (req, res) => {
    const { book_code, book_return_date } = req.body
    const member_id = req.id

    await BookLoanData.findOne({  where: {book_code: book_code} })
    .then(resp => {        
        if (resp == null || resp.member_id != member_id ) {
            return res.status(400).send({ message: "You don't borrow this book!" })
        }
        
        const borrowDate = new Date(resp.createdAt)
        const returnDate = new Date(book_return_date)
        const differenceBtwDates = returnDate - borrowDate
        const aDayInMs = 24 * 60 * 60 * 1000
        const daysDiff = Math.round(differenceBtwDates / aDayInMs)        
        const limitDate = new Date(new Date(book_return_date).setDate(returnDate.getDate() + 3));          
        const penaltyLimitDate = new Date(Date.parse(limitDate));   
        
        Book.findOne({  where: {code: book_code} })
        .then(book => {
            book.stock = book.stock + 1
            book.save()
        }).catch()

        if (daysDiff > 7) {
            const penaltyStatus = "on"
            Member.update({ penaltyStatus: penaltyStatus, penaltyLimit: penaltyLimitDate }, {
                where: { id: member_id },
                returning: true
            }).then().catch()

            BookLoanData.destroy({ 
                where: { id: resp.id } 
            }).then().catch()

            return res.status(201).send({ 
                message: `You will be charged a penalty of 3 days until the ${penaltyLimitDate} for returning the book more than 7 days!` 
            })
        }

        BookLoanData.destroy({ where: { id: loan_id } })
        .then(() => {
            res.status(200).send({
                message: "Thank you for returning the book on time.",
            });
        }).catch()
    })
    .catch(e => {
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            e: e.message
        })
    })
}
