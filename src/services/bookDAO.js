import mysql from 'mysql2/promise'
import Book from '../models/book.js';
class BookDao {
    // property
    static instance = null

    constructor() {
        this.connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'book_store'
        });

        this.connection.query('SELECT 1')
            .then(()=>{
                console.log('CONNECT DATABASE SUCCESS');
            })
            .catch((err)=>{
                console.log('CONNECT DATABASE FAILED ' + err);
            });
    }

    static getInstance(){
        if(BookDao.instance == null){
            BookDao.instance = new BookDao()
        }

        return BookDao.instance
    } 

    // METHOD
    async getBook(){
        const query = 'SELECT * FROM book'
        try {
            const [row] = await this.connection.execute(query) 
            const result = []
            if(row.length > 0){
                console.log(">>>>>>>>>>>>>>>> get Books success");
                for(let i = 0; i < row.length; i++){
                    result.push(new Book(row[i].title,row[i].author,row[i].category,row[i].price,row[i].id))
                }
            }
            return result
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async getBookById(id){
        const query = `SELECT * FROM book WHERE id = ?`
        try {
            const [row] = await this.connection.execute(query,[id])
            console.log(">>>>>>>>>>>>>>>> get Book success"); 
            if(row.length > 0){
                return [ new Book(row[0].title,row[0].author,row[0].category,row[0].price,row[0].id) ]
            }else{
                return []
            }
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async deleteBook(id){
        const query = 'DELETE FROM book WHERE id = ?'

        try {
            const result = await this.connection.execute(query,[id]) 
            console.log(">>>>>>>>>>>>>>>>delete success");
            return result[0].affectedRows;
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async updateBook(book){
        const query = 'UPDATE book SET title = ?, author = ?, category = ?, price = ? WHERE id = ?'

        try {
            const result = await this.connection.execute(query,[book.title,book.author,book.category,book.price,book.id]) 
            console.log(">>>>>>>>>>>>>>>>update success");
            return result[0].affectedRows
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async createBook(book){
        const query = 'INSERT INTO book(title,author,category,price) VALUES(?,?,?,?)'

        try {
            const result = await this.connection.execute(query,[book.title,book.author,book.category,book.price]) 
            console.log(">>>>>>>>>>>>>>>> create success");
            return result[0].insertId
        } catch (error) {
            console.error(error);
            return null
        }
    }

}
const dbconnection = BookDao.getInstance()
export default dbconnection