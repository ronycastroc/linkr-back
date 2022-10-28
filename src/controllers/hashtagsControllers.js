import * as hashtagRepository from "../repositories/hashtagRepository.js";

const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = res.locals.userId;
  try {
    const existingPost = await postRepository.getPost(postId);
    if (existingPost.rowCount === 0) {
      return res.sendStatus(404);
    }
    await likeRepository.insertLike(userId, postId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


async function getHashtagTrending(req, res) {
     
  try {
     const trending = await hashtagRepository.getTrending();  
    return res.status(200).send(trending);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function getHashtagPosts(req, res){
  const { hashtag } = req.params;
  const {offset}=req.query;
  try {
    const findHashtag = await hashtagRepository.findHashtagInText(hashtag);
    
    if( findHashtag < 1){
      return res.sendStatus(404); 
    }

    const listPosts = await hashtagRepository.getHashtagPosts(hashtag,offset);
    const length=await hashtagRepository.getHashtagPostsLength(hashtag);
    return res.status(200).send({length,listPosts});
  
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

}

export { getHashtagTrending, getHashtagPosts  };
