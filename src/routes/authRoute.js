import express from 'express';
import { checkToken, login, register } from '../controllers/authController.js';
const router = express.Router()

// login
router.post('/login', login)

// register
router.post('/register', register)

// check token
router.post('/check-token', checkToken)

export { router as initAuthRoute };