import express from 'express';
import { getUserInfo } from '../controllers/userController.js';
import authenticate from '../middleware/authentication.js';

const router = express.Router()

const initUserRoute = (app)=>{

    router.use(authenticate)
    // get user info
    router.get('/',getUserInfo)

    return app.use('/api/user/',router)
}

export default initUserRoute
