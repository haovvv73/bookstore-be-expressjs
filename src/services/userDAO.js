import { User } from "../models/user.js";
import Dbconnection from "./dbSingleton.js";

class UserDao {
    // property
    constructor() {
        this.connection = Dbconnection.getInstance().connection
    }

    async getUserInfo(email) {
        const query = 'SELECT * FROM user WHERE email = ?'
        try {
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
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async saveUser(user) {
        const query = 'INSERT INTO user(name,email,phone,password) VALUES(?,?,?,?)'

        try {
            const result = await this.connection.execute(query, [user.name, user.email, user.phone, user.password])
            console.log(">>>>>>>>>>>>>>>> create user success");
            return result[0].affectedRows
        } catch (error) {
            // get value error
            console.log(error.sqlMessage);
            const errorMessage = error.sqlMessage;
            const startIndex = errorMessage.indexOf("'") + 1;
            const endIndex = errorMessage.indexOf("'", startIndex);
            const value1 = errorMessage.substring(startIndex, endIndex);

            const secondStartIndex = errorMessage.indexOf("'", endIndex + 1) + 1;
            const secondEndIndex = errorMessage.indexOf("'", secondStartIndex);
            const value2 = errorMessage.substring(secondStartIndex, secondEndIndex);

            const values = [value1, value2];
            
            if( ['email','phone'].some( key => key == values[1] ) ){
                return values[1]  + " IS EXIST"
            }

            return null
        }
    }
}

const userDAO = new UserDao()
export default userDAO