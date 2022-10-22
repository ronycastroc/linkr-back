import { connection } from "../database/db.js";
import urlMetadata from "url-metadata";
import * as timelineRepository from "../repositories/timelineRepository.js"
import * as postRepository from "../repositories/postRepository.js";
import * as likeRepository from "../repositories/likeRepository.js";

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
}

const erasePost = async (req, res) => {
  const { postId } = req.params;
  const userId = res.loclas.userId;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    if (existingPost.rows[0].userId !== userId) {
      return res.sendStatus(401);
    }
    await likeRepository.deleteLike(postId);
    await postRepository.deletePost(postId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    await postRepository.updatePost(postId);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { postLink, getLinks, erasePost, editPost };
