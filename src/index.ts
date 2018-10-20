import app from './App'
import * as dotenv from 'dotenv';
import db from './models/index'
dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }
  db.User.sync();
  return console.log(`server is listening on ${port}`)
})