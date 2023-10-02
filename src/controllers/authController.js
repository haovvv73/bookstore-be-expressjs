import userDAO from "../services/userDAO.js";
import { User } from "../models/user.js";
import { createToken, isTokenExpired } from "../util/tokenTool.js";
import errorResponse from "../helpers/errorResponse.js";
import { getErrorSql } from "../util/errorSqlTool.js";

const login = async (req, res, next) => {

    const { email, password } = req.body;
    // validate
    if (!email || !password) return errorResponse(res, 'missing data', 400)

    try {
        // check user 
        const result = await userDAO.getUserInfo(email)
        if (result.length <= 0) return errorResponse(res, 'user does not exist', 401)

        // check password
        const user = result[0];
        const isMatch = (password === user.password) ? true : false
        if (!isMatch) return errorResponse(res, 'wrong password', 401)

        // pass => return token
        const token = createToken(user)

        return res.status(200).json({
            message: "LOGIN SUCCESS",
            status: true,
            token
        });

    } catch (error) {
        next(error)
    }
}

const register = async (req, res) => {

    const { email, name, phone, password } = req.body;
    // validate
    if (!email || !password || !name || !phone) return errorResponse(res, 'missing data', 400)

    try {
        const user = new User(null, email, name, password, phone)
        const result = await userDAO.saveUser(user)
        // invalid data
        if (result === 0) return errorResponse(res, 'can not save user', 401)

        // pass => return token
        const token = createToken(user);
        return res.status(201).json({
            message: "OK SAVE USER",
            status: true,
            token
        })

    } catch (error) {
        // get value error
        console.log(error);
        const errorMessage = error.sqlMessage;
        // [ 0             , 1         ]
        // [ error message, error field]
        const values = getErrorSql(errorMessage)

        // email is exist | phone is exist
        if (['email', 'phone'].some(key => key == values[1])) return errorResponse(res, values[1] + " is exist", 409)

        next(error)
    }

}

const checkToken = (req, res) => {
    console.log(">>>>>>>>>>>>>>>> check token");
    const { authToken } = req.headers;
    if (!authToken) return false
    return isTokenExpired(authToken)
}

export { login, register, checkToken }