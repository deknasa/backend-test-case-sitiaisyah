const request = require("supertest")
const app = require("../index")
const { sequelize } = require("../models")

const bookData = {
    code: "XYZ",
    title: "ini buku",
    author: "alex",
    stock: 1
}
const bookDataFailed = {
    code: "XYZ",
    title: "ini buku",
    author: "alex",
    stock: "1"
}

describe('show all books', () => {
    it("should return 200 status code", (done) => {
        request(app)
            .get("/book/getAllBooks")
            .then(res => {
                expect(200)
                expect(typeof res.body).toEqual("object")
                done()
            }).catch(error => {
                done(error)
            })
    })
})

describe('add book', () => {
    it("should return 201", (done) => {
        request(app)
            .post('/book/add')
            .send(bookData)
            .then(res => {
                expect(201)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 503 status code", (done) => {
        request(app).post("/book/add")
            .send(bookDataFailed)
            .then(res => {
                expect(503)
                expect(typeof res.body).toEqual("object")
                done()
            }).catch(error => {
                done(error)
            })
    })
})