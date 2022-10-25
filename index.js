import express from "express";
import mongoose from "mongoose";
import chalk from "chalk";
import cors from "cors";
import * as routes from "./routes/index.js";
import * as dotenv from 'dotenv'
dotenv.config()

// const PORT = process.env.PORT || 80

const errorNsg = chalk.bgKeyword("white").redBright;
const successNsg = chalk.bgKeyword("green").white;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// (async () => {
   mongoose
    .connect(process.env.MONGO_URL)
    // .connect('mongodb+srv://Ruslan:gjcnfk156@cluster0.odh79.mongodb.net/products?retryWrites=true&w=majority')
    .then(() => console.log(successNsg("DB Product ok")))
    .catch((err) => console.log(errorNsg("DB error", err)));
  // })();
   

  app.use(routes.apiProductRoutes);
  app.use(routes.apiPostRoutes);
  app.use(routes.apiAuthRoutes);
  app.use(routes.apiUploadRoutes);
  app.get('/test', (req, res) => {
    res.end(`
    <div>
    <nav>
    <ul>
    <li>
    <a href='/test'>push</a>
    </li>
    <li>
    <a href='/home'>home</a>
    </li>
    </ul>
    </nav>
    <h1>Test</h1>
    </div>
    `)
  })
  app.get('/home', (req, res) => {
    res.end(`
    <div>
    <nav>
    <ul>
    <li>
    <a href='/test'>push</a>
    </li>
    <li>
    <a href='/home'>home</a>
    </li>
    </ul>
    </nav>
    <h1>Home</h1>
    </div>
    `)
  })

  // app.listen(PORT, (error) => {
  app.listen(process.env.PORT || 4444, (error) => {
    error
      ? console.log(errorNsg(error))
      : console.log(successNsg(`Listening port ${process.env.PORT || 4444}`));
  });