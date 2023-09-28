import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '../controllers/apiController.js';
import authenticate from '../middleware/authentication.js';

const router = express.Router()

const initApiRoute = (app)=>{

    router.use(authenticate)
    // all book
    router.get('/',getBooks)

    // book
    router.get('/book/:id',getBookById)
      
    // create
    router.post('/create',createBook)

    // update
    router.put('/update',updateBook)
    
    //delete
    router.delete('/delete/:id', deleteBook)

    return app.use('/api/books/',router)
}

export default initApiRoute;