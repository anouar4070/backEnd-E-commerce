import express from 'express';
import { dbConnection } from './database/dbConnection.js';
import dotenv from "dotenv";
import categoryRouter from './src/modules/categories/categories.routes.js';
import morgan from 'morgan';
import AppError from './src/utils/AppError.js';
import brandRouter from './src/modules/brand/brand.routes.js';
import subCategoryRouter from './src/modules/subcategories/subcategory.routes.js';


const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.use(morgan('dev'))
app.use("/api/v1/category", categoryRouter )
app.use("/api/v1/subcategory", subCategoryRouter )
app.use("/api/v1/brand", brandRouter )


//& Route not found:
app.all("*", (req, res, next) => {
  // res.json({message: `can't find this route:${req.originalUrl}`})
  next(new AppError(`can't find this route:${req.originalUrl}`, 404))
  
}
)

//& global error handling
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode).json(err.message)
}
)

dbConnection();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//& ensure that unprocessed promise rejections are captured
process.on('unhandledRejection', (err) => {
  console.log(err)
}
)