import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import {openai} from "../index.js";

dotenv.config();     //to use our .env file
const router = express.Router();        //allow us to use routes in a diff file

router.post("/text", async(req,res) => {          //Here it'll be "URL/openai/text"
    try{
        const {text, activeChatId} = req.body;
        // const response = await openai.createChatCompletion({
            //     model: "gpt-3.5-turbo",
            //     prompt: text,
            //     temperature: 0.5,
            //     max_tokens: 2048,
            //     top_p: 1,
            //     frequency_penalty: 0.5,
            //     presence_penalty: 0,
            // });
            
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." }, // this represents the bot and what role they will assume
                    { role: "user", content: text }, // the message that the user sends
                    
                ],
            });

        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            {text:response.choices[0].message.content},
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": process.env.BOT_USER_NAME,
                    "User-Secret": process.env.BOT_USER_SECRET,
                },
            
            }
        );

        res.status(200).json({text: response.choices[0].message.content});
    }catch(error){
        console.log("Error",error);
        res.status(500).json({error:error.message});
    }
})

export default router;