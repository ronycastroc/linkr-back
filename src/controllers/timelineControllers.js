import { connection } from "../database/db.js";
import urlMetadata from "url-metadata";
import * as timelineRepository from "../repositories/timelineRepository.js"

const postLink=async(req,res)=>{
    const {url,id}=req.body;
    const urlMetadatas= urlMetadata;
    let metadatas;
    let description,image,title;
    let {text}=req.body;
    if(!text){
        text=null;
    }
    try {
    metadatas =  await urlMetadatas(url)
    } catch (error) {
        console.log(error);
    }
   description=metadatas.description;
   image=metadatas.image;
   title=metadatas.title;
   try {
    await timelineRepository.insertPost(id,text,url,description,image,title);
    res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const getLinks = async (req,res)=>{
    
    try {
        const urls = await timelineRepository.listPosts()
        res.send(urls)
    } catch (error) {
        res.status(500).send(error.message);
    }
    

};

export {postLink,getLinks}