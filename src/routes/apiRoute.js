import express from 'express';
import { initAuthRoute } from "./authRoute.js"
import { initBooksRoute } from "./booksRoute.js"
import { initUserRoute } from "./userRoute.js"
import authenticate from '../middleware/authentication.js'

const router = express.Router()

const initApiRoute = (app) => {

    // auth route 
    router.use('/api/v1/auth/', initAuthRoute)

    // authenticate midleware
    router.use(authenticate)
    
    // book route
    router.use('/api/v1/', initBooksRoute)

    // user route
    router.use('/api/v1/', initUserRoute)

    return app.use(router)
}

export default initApiRoute