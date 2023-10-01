import { User } from "../models/user.js";
import Dbconnection from "./dbSingleton.js";

class UserDao {
    // property
    constructor() {
        this.connection = Dbconnection.getInstance().connection
    }

    async getUserInfo(email) {
        const query = 'SELECT * FROM user WHERE email = ?'
        const [row] = await this.connection.execute(query, [email])
        const result = []
        if (row.length > 0) {
            console.log(">>>>>>>>>>>>>>>> get user success");
            for (let i = 0; i < row.length; i++) {
                result.push(new User(
                    row[0].id,
                    row[0].email,
                    row[0].name,
                    row[0].password,
                    row[0].phone
                ))
            }
        }
        return result
    }

    async saveUser(user) {
        const query = 'INSERT INTO user(name,email,phone,password) VALUES(?,?,?,?)'
        const result = await this.connection.execute(query, [user.name, user.email, user.phone, user.password])
        console.log(">>>>>>>>>>>>>>>> create user success");
        return result[0].affectedRows
    }
}

const userDAO = new UserDao()
export default userDAO