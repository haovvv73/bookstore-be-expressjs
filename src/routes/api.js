import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '../controllers/apiController.js';

const router = express.Router()

const initApiRoute = (app)=>{

    router.get('/',getBooks)

    router.get('/book/:id',getBookById)
      
    router.post('/create',createBook)

    router.put('/update',updateBook)
    
    router.delete('/delete/:id', deleteBook)

    return app.use('/api/books/',router)
}

export default initApiRoute;