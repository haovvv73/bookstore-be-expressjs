import express from 'express';
import initApiRoute from './routes/api.js';

const app = express()
const port = 4040

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// router
initApiRoute(app)

// 404 not foud
app.use((req, res) => {
  return res.send('404 NOT FOUND')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})