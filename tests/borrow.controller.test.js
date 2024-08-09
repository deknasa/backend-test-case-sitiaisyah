const request = require("supertest")
const app = require("../index")
const { sequelize } = require("../models")

let token = 'ini_token'
let book_id_not_found = 0

const failedData = {
    "book_code" : "",
    "borrow_date": "null"
}
const failedReturnData = {
    "book_code" : 123,
    "borrow_date": "null"
}
const borrowBookBodyData = {
    "book_code" : "XYZ",
    "borrow_date": "2024-08-17"
}
const returnBookBodyData = {
    "book_code" : "XYZ",
    "return_date": "2024-08-17"
}

describe('post borrow book', () => {
    it("should return 201", (done) => {
        request(app)
            .post('/borrowBook/borrow')
            .set('auth', `${token}`)
            .send(borrowBookBodyData)
            .then(res => {
                expect(201)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 400", (done) => {
        request(app)
            .post('/borrowBook/borrow')
            .set('auth', `${token}`)
            .send(borrowBookBodyData)
            .then(res => {
                expect(400)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 401", (done) => {
        request(app)
            .post('/borrowBook/borrow')
            .set('auth', `${token}`)
            .send(book_id_not_found)
            .then(res => {
                expect(401)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 201", (done) => {
        request(app)
            .post('/borrowBook/borrow')
            .set('auth', `${token}`)
            .send(borrowBookBodyData)
            .then(res => {
                expect(201)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 403", (done) => {
        request(app)
            .post('/borrowBook/borrow')
            .set('auth', `${token}`)
            .send(borrowBookBodyData)
            .then(res => {
                expect(403)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 404", (done) => {
        request(app)
            .post('/borrowBook/borrow')
            .set('auth', `${token}`)
            .send(borrowBookBodyData)
            .then(res => {
                expect(404)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 501", (done) => {
        request(app)
            .post('/borrowBook/borrow')
            .set('auth', `${token}`)
            .send(failedData)
            .then(res => {
                expect(501)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 503", (done) => {
        request(app)
            .post('/borrowBook/borrow')
            .set('auth', `${token}`)
            .send(failedData)
            .then(res => {
                expect(503)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 504", (done) => {
        const response = request(app)
            .post('/borrowBook/borrow')
            .set('auth', `${token}`)
            .send(failedData)
            .then(res => {
                expect(504)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe('post return book', () => {
    it("should return 200", (done) => {
        request(app)
            .post('/borrowBook/return')
            .set('auth', `${token}`)
            .send(returnBookBodyData)
            .then(res => {
                expect(200)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 201", (done) => {
        request(app)
            .post('/borrowBook/return')
            .set('auth', `${token}`)
            .send(returnBookBodyData)
            .then(res => {
                expect(201)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 400", (done) => {
        request(app)
            .post('/borrowBook/return')
            .set('auth', `${token}`)
            .send(book_id_not_found)
            .then(res => {
                expect(400)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 503", (done) => {
        request(app)
            .post('/borrowBook/return')
            .set('auth', `${token}`)
            .send(failedData)
            .then(res => {
                expect(503)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})