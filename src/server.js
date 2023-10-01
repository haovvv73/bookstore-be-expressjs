import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import initApiRoute from './routes/apiRoute.js';
import errorHandle from './middleware/errorHandle.js';
import errorResponse from './helpers/errorResponse.js';
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

// route
initApiRoute(app)

// middleware
app.use(errorHandle)

// 404 not foud
app.use((req, res) => {
  return errorResponse(res,'INVALID URL',404)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})