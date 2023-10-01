import Book from '../models/book.js';
import Dbconnection from './dbSingleton.js';

class BookDao {
    // property
    constructor() {
        this.connection = Dbconnection.getInstance().connection
    }

    // METHOD
    async getBook() {
        const query = 'SELECT * FROM book'
        const [row] = await this.connection.execute(query)
        const result = []
        if (row.length > 0) {
            console.log(">>>>>>>>>>>>>>>> GET Books success");
            for (let i = 0; i < row.length; i++) {
                result.push(new Book(row[i].title, row[i].author, row[i].category, row[i].price, row[i].id))
            }
        }
        return result
    }

    async getBookById(id) {
        const query = `SELECT * FROM book WHERE id = ?`

        const [row] = await this.connection.execute(query, [id])
        console.log(">>>>>>>>>>>>>>>> GET Book success");
        const results = []
        if (row.length > 0) results.push(new Book(row[0].title, row[0].author, row[0].category, row[0].price, row[0].id))
        return results
    }

    async deleteBook(id) {
        const query = 'DELETE FROM book WHERE id = ?'
        const result = await this.connection.execute(query, [id])
        console.log(">>>>>>>>>>>>>>>> DELETE book success");
        return result[0].affectedRows;
    }

    async updateBook(book) {
        const query = 'UPDATE book SET title = ?, author = ?, category = ?, price = ? WHERE id = ?'
        const result = await this.connection.execute(query, [book.title, book.author, book.category, book.price, book.id])
        console.log(">>>>>>>>>>>>>>>> UPDATE book success");
        return result[0].affectedRows
    }

    async createBook(book) {
        const query = 'INSERT INTO book(title,author,category,price) VALUES(?,?,?,?)'
        const result = await this.connection.execute(query, [book.title, book.author, book.category, book.price])
        console.log(">>>>>>>>>>>>>>>> CREATE book success");
        return result[0].affectedRows
    }

}
const bookDAO = new BookDao()
export default bookDAO