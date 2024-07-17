import express from 'express';
import { dbConnection } from './database/dbConnection.js';
import dotenv from "dotenv";
import categoryRouter from './src/modules/categories/categories.routes.js';
import morgan from 'morgan';
import AppError from './src/utils/AppError.js';


const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.use(morgan('dev'))
app.use("/api/v1/category", categoryRouter )


//Route not found:
app.all("*", (req, res, next) => {
  // res.json({message: `can't find this route:${req.originalUrl}`})
  next(new AppError(`can't find this route:${req.originalUrl}`, 404))
  
}
)
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode).json(err.message)
}
)

dbConnection();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection', (err) => {
  console.log(err)
}
)