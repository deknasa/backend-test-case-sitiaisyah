const Book = require('../models/index').Book

exports.addBook = async (req, res) => {
    const { code, title, author, stock } = req.body

    await Book.findOne({ where: { code: code } })
    .then(book => {
        if (book) {
            return res.status(400).send({ message: "Code Already Exist" })
        }
        return Book.create({ code, title, author, stock })
        .then(result => {
            res.status(201).send({
                book_data: {
                    code: result.code,
                    title: result.title,
                    author: result.author,
                    stock: result.stock
                },
            })
        })
        .catch(e => {
            res.status(403).send({ message: "FAILED TO ADD BOOK", error: e.message })
        })
    })
    .catch(e => {
        res.status(503).send({ message: "INTERNAL SERVER ERROR", error: e.message })
    })
}

exports.showAllBooks = async(req, res) => {
    await Book.findAll({ attributes: ['code','title', 'author', 'stock'] })
    .then(results => {
        res.status(200).json({ results })
    })
    .catch(error => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    })
}