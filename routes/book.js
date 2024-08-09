const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

/**
 * @swagger
 * '/add':
 *   post:
 *      tags: 
 *      - Book Controller
 *      summary: Add new book.
 *      description: Add new book data to the database.
 *      requestBody:
 *          required: true
 *      responses:
 *          201:
 *              description: Successfully added new book data.
 *          400:
 *              description: New book data already exists.
 *          403:
 *              description: Failed to added new book data.
 *          503:
 *              description: Internal Server Error.
 */
router.post('/add', bookController.addBook)

/**
 * @swagger
 * '/getAllBooks':
 *   get:
 *      tags: 
 *      - Book Controller
 *      summary: Show all books data.
 *      description: Retrieve all book data in the database.
 *      responses:
 *          201:
 *              description: Successfully added new book data.
 *          503:
 *              description: Internal Server Error.
 */
router.get('/getAllBooks', bookController.showAllBooks)

module.exports = router