const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../index")
const { sequelize } = require("../models")

const secretKey = "secret";

const memberData = {
    "email": "siti@gmail.com",
    "password": "siti"
} 

const memberDataFailed = {
    "email": "dika@gmail.com",
    "password": "dika123"
}

const memberDataFailedlogin = {
    "email": "dikagmail.com",
    "password": 124
}

let member_id = ''
let token = ''

const dataRegistrasiFailed = {
    name: "dimas",
    email: "dimasgmail.com",
    password: "dimas",
}

const dataRegistrasiNewUser = {
    name: "dinda",
    email: "dinda@gmail.com",
    password: "dinda",
}

describe('Register', () => {
    it("should return 201", (done) => {
        request(app)
        .post("/member/register")
        .send(dataRegistrasiNewUser)
        .end((err, res) => {
            if (err) {
                done(err)
            }
            expect(201)
            expect(typeof res.body).toEqual("object")
            expect(res.body.name).toEqual(dataRegistrasiNewUser.phone_number)
            done()
        })
    })

    it("should return 400", (done) => {
        request(app)
        .post('/member/register')
        .send(dataRegistrasiNewUser)
        .end((err, res) => {
            if (err) {
                done(err)
            }
            expect(400)
            expect(typeof res.body).toEqual("object")
            done()
        })
    })

    it("should return 403", (done) => {
        request(app)
            .post('/member/register')
            .send(dataRegistrasiFailed)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                expect(403)
                expect(typeof res.body).toEqual("object")
                done()
            })
    })
    it("should return 503", (done) => {
        request(app)
            .post('/member/register')
            .send(dataRegistrasiFailed)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(503)
                expect(typeof res.body).toEqual("object")
                done()
            })
    })
})

describe('Login', () => {
    it("should return 200", function(done) {
        request(app).post("/member/login")
            .send(memberData)
            .end((error, res) => {
                if (error) done(error)
                token = res.body.token
                jwt.verify(token, secretKey, (err, decoded) => {
                    member_id = decoded.id
                });
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.token).toEqual("string")
                expect(typeof res.body.token).not.toEqual("object")
                expect(typeof res.status).toEqual("number")
                return done()
            })
    })

    it("should return 401", (done) => {
        request(app).post("/member/login")
            .send(memberDataFailedlogin)
            .end((error, res) => {
                if (error) done(error)
                token = res.body.token
                expect(401)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).toEqual("string")
                expect(typeof res.body.message).not.toEqual("number")
                expect(typeof res.status).toEqual("number")
                done()
            })
    })

    it("should return 503", (done) => {
        request(app).post("/member/login")
            .send(memberDataFailed)
            .end((error, res) => {
                if (error) done(error)
                token = res.body.token
                expect(503)
                expect(typeof res.body).toEqual("object")
                done()
            })
    })
})