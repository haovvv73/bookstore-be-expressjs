import Book from '../models/book.js';
import Dbconnection from './dbSingleton.js';

class BookDao {
    // property
    constructor(){
        this.connection = Dbconnection.getInstance().connection
    }

    // METHOD
    async getBook(){
        const query = 'SELECT * FROM book'
        try {
            const [row] = await this.connection.execute(query) 
            const result = []
            if(row.length > 0){
                console.log(">>>>>>>>>>>>>>>> GET Books success");
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
            console.log(">>>>>>>>>>>>>>>> GET Book success"); 
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
            console.log(">>>>>>>>>>>>>>>> DELETE book success");
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
            console.log(">>>>>>>>>>>>>>>> UPDATE book success");
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
            console.log(">>>>>>>>>>>>>>>> CREATE book success");
            return result[0].affectedRows
        } catch (error) {
            console.error(error);
            return null
        }
    }

}
const bookDAO = new BookDao()
export default bookDAO