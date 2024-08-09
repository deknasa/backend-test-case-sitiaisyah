const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bookRouter = require('./routes/book')
const memberRouter = require('./routes/member')
const borrowBookRouter = require('./routes/borrowingBook')
const swaggerSpec = require('./swagger');
const swaggerUi = require('swagger-ui-express');

app.use(express.json())

app.use('/member', memberRouter, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/book', bookRouter, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/borrowBook', borrowBookRouter, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`server is running on port ${port}`))
}

module.exports = app