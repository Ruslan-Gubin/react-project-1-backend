import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { chalks } from "./utils/index.js";
import * as dotenv from "dotenv";
import * as routes from "./routes/index.js";


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({limit: '50mb'}));  

(async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(chalks.success("DB Product ok"))) 
    .catch((err) => console.log(chalks.error("DB error", err)));
})();

app.use(routes.productRouter);
app.use(routes.postRouter);
app.use(routes.authRouter);
app.use(routes.commentRouter); 
app.use(routes.dialogRouter); 

app.listen(process.env.PORT || 4444, (error) => {
  error
    ? console.log(chalks.error(error))
    : console.log(chalks.success(`Listening port ${process.env.PORT || 4444}`)); 
});
