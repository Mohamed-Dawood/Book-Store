const Book = require('../models/books')
const { StatusCodes } = require('http-status-codes');


const getAllBooks = async (req, res) => {
    const orders = await Book.find({});
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
}


module.exports = {
    getAllBooks,
};