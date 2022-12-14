const addBook = require('./addBook');
const addBookReview = require('./addBookReview');
const findBook = require('./findBook');
const findDuplicate = require('./findDuplicate');
const getAllBooks = require('./getAllBooks');
const updateBookStatus = require('./updateBookStatus');
const getBookByBookId = require('./getBookByBookId');

module.exports = {
    addBook,
    addBookReview,
    findBook,
    findDuplicate,
    getAllBooks,
    updateBookStatus,
    getBookByBookId
}