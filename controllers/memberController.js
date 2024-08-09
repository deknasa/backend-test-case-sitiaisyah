const Member = require("../models/index").Member
const BookLoanData = require("../models/index").BookLoanData
const generateToken = require("../middleware/auth").generateToken
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    const { name, email, password } = req.body
    await Member.findOne({ where: { email: email } })
    .then(member => {
        if (member) {
            return res.status(400).send({ message: "Email Already Exist" })
        }

        return Member.create({ name, email, password })
        .then(member => {
            res.status(201).send({
                member: {
                    id: member.id,
                    name: member.name,
                    email: member.email,
                    createdAt: member.createdAt
                },
            })
        })
        .catch(e => {
            res.status(403).send({ message: "FAILED TO REGISTER", error: e.message })
        })
    })
    .catch(e => {
        res.status(503).send({ message: "INTERNAL SERVER ERROR", error: e.message })
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    await Member.findOne({ where: { email: email } })
    .then(member => {
        if (!member) {
            return res.status(401).send({
                message: "email is not registered, please register"
            })
        }
        const passwordValid = bcrypt.compareSync(password, member.password)
        if (!passwordValid) {
            return res.status(403).send({ message: "password not match" })
        }
        const data = {
            id: member.id,
            name: member.name,
            email: member.email
        }
        const token = generateToken(data)
        res.status(200).send({
            token: token
        })
    })
    .catch(e => {
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            error: e.message
        })
    })
}

exports.allMember = async(req, res) => {
    await Member.findAll({ 
        attributes: ['id','name', 'email'],
        include: [{
            model: BookLoanData,
            as: "book_loan_data",
            attributes: ['book_code']
        }]
    })
    .then(members => {
        res.status(200).json({  members })
    })
    .catch(error => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    })
}