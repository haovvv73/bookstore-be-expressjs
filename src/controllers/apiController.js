import Book from '../models/book.js';
import bookDAO from '../services/bookDAO.js';

const getBooks = async (req, res) => {

    const result = await bookDAO.getBook()

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Internal Server Error",
        })
    }

    return res.status(200).json({
        message : "OK GET ALL BOOK",
        status : true,
        data: result
    })
}

const getBookById = async (req, res) => {

    const {id} = req.params
    const result = await bookDAO.getBookById(id)

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Internal Server Error",
        })
    }

    if(result.length <= 0){
        return res.status(401).json({
            message : "BOOK DOES NOT EXIST",
            status : false,
        })
    }

    return res.status(200).json({
        message : "OK GET BOOK",
        status : true,
        data: result
    })
}

const deleteBook = async (req, res) => {

    const {id} = req.params
    const result = await bookDAO.deleteBook(id)

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Something wrong in server",
        })
    }

    if(result === 0){
        return res.status(401).json({
            message : "BOOK DOES NOT EXIST",
            status : false,
        })
    }

    return res.status(200).json({
        message : "OK DELETE BOOK",
        status : true,
    })
}

const updateBook = async (req, res) => {

    const { title, author, category, price, id } = req.body

    if(!title || !author || !category || !price || !id){
        return res.status(400).json({
            status : false,
            message : "MISSING DATA",
        })
    }

    const result = await bookDAO.updateBook(new Book(title, author, category, price, id))

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Internal Server Error",
        })
    }

    if(result === 0){
        return res.status(401).json({
            message : "BOOK DOES NOT EXIST",
            status : false,
        })
    }

    return res.status(200).json({
        message : "OK UPDATE BOOK",
        status : true,
    })
}

const createBook = async (req, res) => {

    const { title, author, category, price } = req.body
    
    if(!title || !author || !category || !price ){
        return res.status(400).json({
            status : false,
            message : "MISSING DATA",
        })
    }

    const result = await bookDAO.createBook(new Book(title, author, category, price))

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Internal Server Error",
        })
    }

    if(result === 0){
        return res.status(401).json({
            message : "CAN NOT SAVE BOOK",
            status : false,
        })
    }

    return res.status(201).json({
        message : "OK CREATE BOOK",
        status : true,
    })

}

export { getBooks, getBookById, deleteBook, updateBook, createBook }