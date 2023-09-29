import express from 'express';
import { checkToken, login, register } from '../controllers/authController.js';
const router = express.Router()

const initAuthRoute = (app)=>{

    // login
    router.post('/login',login)

    // register
    router.post('/register',register)

    // check token
    router.post('/check-token',checkToken)

    return app.use('/api/auth/',router)
}

export default initAuthRoute;