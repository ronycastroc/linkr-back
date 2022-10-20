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
    } catch (error) {
        console.log(error);
    }



    //midleware
    try {
        await connection.query(`
            INSERT INTO "posts"
                ("userId",text,url)
                VALUES
                ($1,$2,$3);
    
    `,[id,text,url]);
    res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }

    

};

async function getMetadata (){
    const urlMetadatas= urlMetadata;
     await urlMetadatas('https://bootcampra.notion.site/Ter-a-13-09-Trabalhando-com-Branches-2b83967706ad4cd7a17917d96532bbad')
     .then(
    function (metadata) { // success handler
        return metadata;
    },
    function (error) { // failure handler
    console.log(error)
  })
}
export{postLink}