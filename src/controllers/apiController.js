import Book from '../models/book.js';
import dbconnection from '../services/bookDAO.js';

const getBooks = async (req, res) => {

    const result = await dbconnection.getBook()

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Something wrong in server",
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
    const result = await dbconnection.getBookById(id)

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Something wrong in server",
        })
    }

    if(result.length <= 0){
        return res.status(200).json({
            message : "NOT FOUND BOOK",
            status : true,
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
    const result = await dbconnection.deleteBook(id)

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Something wrong in server",
        })
    }

    if(result === 0){
        return res.status(200).json({
            message : "NOT FOUND BOOK",
            status : true,
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

    const result = await dbconnection.updateBook(new Book(title, author, category, price, id))

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Something wrong in server",
        })
    }

    if(result === 0){
        return res.status(200).json({
            message : "NOT FOUND BOOK",
            status : true,
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

    const result = await dbconnection.createBook(new Book(title, author, category, price))

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Something wrong in server",
        })
    }

    return res.status(201).json({
        message : "OK CREATE BOOK",
        status : true,
    })

}

export { getBooks, getBookById, deleteBook, updateBook, createBook }