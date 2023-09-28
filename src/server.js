import express from 'express';
import initApiRoute from './routes/api.js';
import initUserRoute from './routes/user.js';
import initAuthRoute from './routes/auth.js';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const port = process.env.PORT | 4040

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// config CORS
app.use(
  cors({
    origin: '*',
  })
);

// router
// auth
initAuthRoute(app)
// user
initUserRoute(app)
// book api 
initApiRoute(app)

// 404 not foud
app.use((req, res) => {
  return res.status(404).json({
    status: false,
    message: 'INVALID URL'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})