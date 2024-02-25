import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";            //morgan basically logs when the api endpoint has been hit and the status
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from 'openai';
import openAiRoutes from "./routes/openai.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* OPEN AI CONFIGURATIONS */
export const openai = new OpenAI({
    apiKey: process.env['OPEN_API_KEY'], // This is the default and can be omitted
  });
// const configuration = new Configuration({
//     apiKey: process.env.OPEN_API_KEY,
// });
// export const openai = new OpenAIApi(configuration);   //allow us to call our routes whenever we need


/* ROUTES */
app.use('/openai', openAiRoutes);    //when we hit the request, it'll be "URL/openai" then move onto openai.js

/* SERVER SETUP */
const PORT = process.env.PORT || 9000;    //9000 as backup port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})