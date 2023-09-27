import express from 'express';
import initApiRoute from './routes/api.js';

const app = express()
const port = 4040

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// config CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// router
initApiRoute(app)

// 404 not foud
app.use((req, res) => {
  return res.status(404).json({
    status : false,
    message: 'INVALID URL'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})