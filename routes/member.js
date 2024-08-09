const express = require('express')
const router = express.Router()
const memberController = require('../controllers/memberController')

/**
 * @swagger
 * '/register':
 *   post:
 *      tags: 
 *      - Member Controller
 *      summary: Add new member.
 *      description: Add new member data to the database.
 *      requestBody:
 *          required: true
 *      responses:
 *          201:
 *              description: Successfully added new member data.
 *          400:
 *              description: New member data already exists.
 *          403:
 *              description: Failed to added new member data.
 *          503:
 *              description: Internal Server Error.
 */
router.post('/register', memberController.register)

/**
 * @swagger
 * '/login':
 *   post:
 *      tags: 
 *      - Member Controller
 *      summary: Login member.
 *      description: Create member login post to use the application.
 *      requestBody:
 *          required: true
 *      responses:
 *          200:
 *              description: Successfully login.
 *          400:
 *              description: Member email is not registered.
 *          401:
 *              description: Email data and password data not match.
 *          503:
 *              description: Internal Server Error.
 */
router.post('/login', memberController.login)

/**
 * @swagger
 * '/allMembers':
 *   get:
 *      tags: 
 *      - Member Controller
 *      summary: Show all members.
 *      description: Retrieve all member data in the database.
 *      responses:
 *          200:
 *              description: Successfully display all member data.
 *          503:
 *              description: Internal Server Error.
 */
router.get('/allMembers', memberController.allMember)

module.exports = router