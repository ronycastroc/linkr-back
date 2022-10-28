import * as commentsRepository from "../repositories/commentsRepository.js"


async function listComments (req, res){
const { postId } = req.params;

try {
    const findPost = await commentsRepository.getPost(postId);
    
    if(findPost.length === 0){
        return res.status(404).send('Post não encontrado');
    }
    
    const listComments = await commentsRepository.getComments(postId);
    
    let result = [];
  
    for(let i=0; i<listComments.length; i++){
        let followStatus= await isFollower(listComments[i].userId,listComments[i].postOwnerId)
        let withFollowStatus = {...listComments[i],followStatus}
         result.push(withFollowStatus)
    }

    return res.status(200).send(result)
} catch (error) {
    console.log(error);
    return res.sendStatus(500);
}

}


async function insertComment(req, res){
const {comment }  = req.body;
const {postId} = req.params;


try {
    const insertComment = await commentsRepository.postComment(res.locals.userId, postId, comment)
    
    res.sendStatus(201)
} catch (error) {
    console.log(error);
    return res.sendStatus(500);
    
}
 }
        

 async function countingComments(req, res){
    const { postId } = req.params;

    try {
        const numberOfComments = await commentsRepository.getNumberOfComments(postId);
        return res.send(numberOfComments)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }

 }

 async function isFollower(followerId, followedId){
         
    try {
        if(followerId === followedId ){
           return `• post’s author`;
        }
        const followStatus = await commentsRepository.getFollowStatus(followerId, followedId);
       
        if(followStatus.length === 0){
        return "";
       }
       return "• following";
       
    } catch (error) {
        console.log(error);
        return "";
        
    }
    

 }
export { listComments, insertComment, countingComments}