const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const errorMiddleware = require('./middlewares/error')

//load config file 
dotenv.config({ path: './config/config.env' })

connectDB()

//Route Files 
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')

const app = express()

//Body Parser

app.use(express.json())

//logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('combined'));
}

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    //Close server & exit process
    server.close(() => process.exit(1))
})