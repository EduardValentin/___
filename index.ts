import app from './App';
import DatabasePool from './DatabasePool';

require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }
  return console.log(`server is listening on ${port}`)
});

process.on('SIGTERM', () => {
  DatabasePool.getInstance().endPool();
});

process.on('SIGKILL', () => {
  DatabasePool.getInstance().endPool();
});