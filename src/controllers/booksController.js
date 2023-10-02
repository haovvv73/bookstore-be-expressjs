import errorResponse from '../helpers/errorResponse.js';
import successResponse from '../helpers/successResponse.js';
import Book from '../models/book.js';
import bookDAO from '../services/bookDAO.js';
import { getErrorSql } from '../util/errorSqlTool.js';

const getBooks = async (req, res, next) => {

    try {
        const result = await bookDAO.getBook()
        return successResponse(res, 'ok get books', result, 200)
    } catch (error) {
        next(error)
    }
}

const getBookById = async (req, res, next) => {

    const { id } = req.params
    // validate data
    if (!id) return errorResponse(res, 'missing data', 400)

    try {
        const result = await bookDAO.getBookById(id)
        // invalid infomation client
        if (result.length <= 0) return errorResponse(res, 'book does not exist', 401)

        return successResponse(res, 'OK get book', result, 200)
    } catch (error) {
        next(error)
    }
}

const deleteBook = async (req, res, next) => {

    const { id } = req.params
    // validate
    if (!id) return errorResponse(res, 'missing data', 400)

    try {
        const result = await bookDAO.deleteBook(id)
        // invalid infomation client
        if (result === 0) errorResponse(res, 'book does not exist', 401)

        return successResponse(res, 'OK delete book', [], 200)
    } catch (error) {
        next(error)
    }
}

const updateBook = async (req, res, next) => {

    const { title, author, category, price, id } = req.body
    // validate
    if (!title || !author || !category || !price || !id) return errorResponse(res, 'missing data', 400)

    try {

        const result = await bookDAO.updateBook(new Book(title, author, category, price, id))
        // invalid information client
        if (result === 0) return errorResponse(res, 'book does not exist', 401)

        return successResponse(res, 'OK update book', [], 200)
    } catch (error) {
        // console.log(error);
        const errorMessage = error.sqlMessage;
        // [ 0: error message, 1: error field]
        const values = getErrorSql(errorMessage)

        // book is exist
        if (['title', 'category'].some(key => key == values[1])) return errorResponse(res, values[0] + " is exist", 409)
    }
}

const createBook = async (req, res, next) => {

    const { title, author, category, price } = req.body
    // validate
    if (!title || !author || !category || !price) return errorResponse(res, 'missing data', 400)

    try {
        const result = await bookDAO.createBook(new Book(title, author, category, price))
        // invalid informatio client
        if (result === 0) return errorResponse(res, 'can not save book', 401)

        return successResponse(res, 'OK create book', [], 201)
    } catch (error) {
        // console.log(error);
        const errorMessage = error.sqlMessage;
        // [ 0: error message, 1: error field]
        const values = getErrorSql(errorMessage)

        // book is exist
        if (['title', 'category'].some(key => key == values[1])) return errorResponse(res, values[0] + " is exist", 409)
    }
}

export { getBooks, getBookById, deleteBook, updateBook, createBook }