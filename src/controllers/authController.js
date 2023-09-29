import userDAO from "../services/userDAO.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/user.js";
import { createToken, isTokenExpired } from "../util/tokenTool.js";

const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: false,
            message: "MISSING DATA",
        })
    }

    // check user 
    const result = await userDAO.getUserInfo(email)

    if (result == null) {
        return res.status(500).json({
            message: 'Internal Server Error',
            status: false
        })
    }

    if (result.length <= 0) {
        return res.status(401).json({
            message: "user does not exist",
            status: false,
        })
    }

    // check password = Bcrypt
    const user = result[0];

    const isMatch = (password === user.password) ? true : false
    if (!isMatch) {
        return res.status(401).json({
            message: 'wrong password', status: false
        });
    }

    // pass => return token
    const token = createToken(user)

    return res.status(200).json({
        message: "LOGIN SUCCESS",
        status: true,
        token
    });
}

const register = async (req, res) => {

    const {email, name, phone, password } = req.body;

    if (!email || !password || !name || !phone) {
        return res.status(400).json({
            status: false,
            message: "MISSING DATA",
        })
    }

    const user = new User(null,email, name, password, phone)
    const result = await userDAO.saveUser(user)

    if(result == null){
        return res.status(500).json({
            status : false,
            message : "Internal Server Error",
        })
    }

    if(result === 0){
        return res.status(401).json({
            message : "CAN NOT SAVE USER",
            status : false,
        })
    }

    if(typeof result === "string"){
        return res.status(409).json({
            message : result,
            status : false,
        })
    }

    // pass => return token
    const token = createToken(user);
    return res.status(201).json({
        message : "OK SAVE USER",
        status : true,
        token
    })
}

const checkToken = (req,res)=>{
    console.log(">>>>>>>>>>>>>>>> check token");
    const {authToken} = req.headers;
    if (!authToken) return false
    return isTokenExpired(authToken)
}

export { login, register,checkToken }