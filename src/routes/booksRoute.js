import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '../controllers/booksController.js';

const router = express.Router()

// get books
router.get('/books', getBooks)

// get book
router.get('/books/:id', getBookById)

// create
router.post('/books', createBook)

// update
router.put('/books', updateBook)

//delete
router.delete('/books/:id', deleteBook)

export {router as initBooksRoute };