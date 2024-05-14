require('dotenv').config() 
require('express-async-errors')
const express = require('express')
const app = express()
const booksRouter = require('./routes/books')

// security
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')    //prevent NoSQL Injection attacks 

const connectDB = require('./db/connect')

app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60,
    })
    );
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());


app.use(express.static('./public'))


app.use('/api/v1/getbooks', booksRouter)

const PORT = process.env.PORT || 5000

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> console.log(`Server is listening on Port ${PORT} ...`))
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

start()