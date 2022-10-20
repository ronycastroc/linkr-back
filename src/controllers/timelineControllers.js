import { connection } from "../database/db.js";
import joi from "joi";
import urlMetadata from "url-metadata";

const timelineSchema=joi.object({
    "url":joi.string().required(),
    "id":joi.number().required(),
    "text":joi.string().allow('')
});

const postLink=async(req,res)=>{
    //midleware
    const {url,id}=req.body;
    const urlMetadatas= urlMetadata;
    let metadatas;
    let description,image,title;
    let {text}=req.body;
    if(!text){
        text=null;
    }
    const validation = timelineSchema.validate(req.body, { abortEarly: false });
    if(validation.error) {
        const error = validation.error.details.map(value => value.message);
        return res.status(422).send(error);
    }
    try {
        const userIdValidation = (await connection.query(`
        SELECT * 
        FROM users 
        WHERE id = $1;`,[id])).rows[0];
    if (!userIdValidation){
        res.sendStatus(409);
    }
    metadatas =  await urlMetadatas(url)

    } catch (error) {
        console.log(error);
    }

    //midleware
   description=metadatas.description
   image=metadatas.image
   title=metadatas.title
    try {
        await connection.query(`
            INSERT INTO "posts"
                ("userId",text,url,description,image,title)
                VALUES
                ($1,$2,$3,$4,$5,$6);
    
    `,[id,text,url,description,image,title]);
    res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }

    

};


const getLinks = async (req,res)=>{
    
    let urls;
    try {
        urls = (await connection.query(`
            SELECT * 
            FROM posts 
            ORDER BY "createAt" 
            DESC LIMIT 20;
        `)).rows      
    } catch (error) {
        console.log(error)
    }
    res.send(urls)

};

export {postLink,getLinks}