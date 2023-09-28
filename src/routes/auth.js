import express from 'express';
import { login, register } from '../controllers/authController.js';
const router = express.Router()

const initAuthRoute = (app)=>{

    // login
    router.post('/login',login)

    // register
    router.post('/register',register)

    return app.use('/api/auth/',router)
}

export default initAuthRoute;