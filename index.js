import express from "express";
import mongoose from "mongoose";
import chalk from "chalk";
import cors from "cors";
import * as routes from "./routes/index.js";
import * as dotenv from "dotenv";

const errorNsg = chalk.bgKeyword("white").redBright;
const successNsg = chalk.bgKeyword("green").white;

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

(async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(successNsg("DB Product ok")))
    .catch((err) => console.log(errorNsg("DB error", err)));
})();

app.use(routes.apiProductRoutes);
app.use(routes.apiPostRoutes);
app.use(routes.apiAuthRoutes);
app.use(routes.apiUploadRoutes);

app.listen(process.env.PORT || 4444, (error) => {
  error
    ? console.log(errorNsg(error))
    : console.log(successNsg(`Listening port ${process.env.PORT || 4444}`));
});
