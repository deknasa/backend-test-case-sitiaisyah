const express = require('express')
const router = express.Router()
const authentication = require('../middleware/auth').verify   
const borrowingBookController = require('../controllers/borrowingBookController')

/**
 * @swagger
 * '/borrow':
 *   post:
 *      tags: 
 *      - Borrowing Book Controller
 *      summary: Member process of borrowing books.
 *      description: Take data on a book based on the book code when a member wants to borrow the book 
 *                   and reduce the book stock when the book has been borrowed by the member.
 *      requestBody:
 *          required: true
 *      responses:
 *          201:
 *              description: Member successfully borrowed the book.
 *          400:
 *              description: Book data not found in database.
 *          401:
 *              description: The book to be borrowed has been borrowed by another member.
 *          402:
 *              description: Members can't borrow more than two books.
 *          403:
 *              description: Members cannot borrow books because they are under penalty.
 *          404:
 *              description: Members can't borrow books because the penalty period has not expired.
 *          501:
 *              description: Failed to borrow book.
 *          503:
 *              description: Something wrong with the member.
 *          504:
 *              description: Internal Server Error.
 */
router.post('/borrow', authentication, borrowingBookController.borrow)

/**
 * @swagger
 * '/return':
 *   post:
 *      tags: 
 *      - Borrowing Book Controller
 *      summary: Member process of returning books.
 *      description: Retrieving data on books currently being borrowed by members 
 *                  in the database based on the book code restores the book stock to 
 *                  the same level as before the book was borrowed.
 *      requestBody:
 *          required: true
 *      responses:
 *          200:
 *              description: Member successfully returned the book on time.
 *          201:
 *              description: Members who successfully return books more than 7 days after the book was borrowed are given a 3-day penalty.
 *          400:
 *              description: Members are not currently borrowing book data to be returned.
 *          503:
 *              description: Internal Server Error.
 */
router.post('/return', authentication, borrowingBookController.returnBook)

module.exports = router