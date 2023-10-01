import express from 'express';
import { getUserInfo } from '../controllers/userController.js';

const router = express.Router()

// get user info
router.get('/user', getUserInfo)

export { router as initUserRoute }