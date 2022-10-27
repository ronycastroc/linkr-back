import { connection } from "../database/db.js";


async function listComments (req, res){
const { postId } = req.params;
let isFollower = true;

try {
    const post = (await connection.query(`SELECT * FROM posts WHERE id= $1;`,[postId])).rows
    const postOwner = post[0].userId;
    if(post.length === 0){
        return res.status(404).send('Post não encontrado');
    }
    
    const listPosts = (await connection.query(`SELECT comments.*, users.name, users."urlImage" FROM comments JOIN users on comments."userId"=users.id WHERE comments."postId" = $1 ORDER BY comments."createAt" ;`,[postId])).rows;
    
    const result = {listPosts, isFollower}
    return res.status(200).send(listPosts)
} catch (error) {
    console.log(error);
    return res.sendStatus(500);
}

}


async function insertComment(req, res){
const {comment,}  = req.body;
const {postId} = req.params;

try {
    const insertComment = await connection.query(`INSERT INTO comments ("userId", "postId", comment) VALUES ($1, $2, $3);`,[res.locals.userId, postId, comment]);
    
    res.sendStatus(201);
} catch (error) {
    console.log(error);
    return res.sendStatus(500);
    
}
 }
        

 async function countingComments(req, res){
    const { postId } = req.params;

    try {
        const numberOfComments = (await connection.query(`SELECT COUNT(*) FROM comments WHERE "postId"=$1;`,[postId])).rows[0].count;
        return res.send(numberOfComments)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }

 }
export { listComments, insertComment, countingComments }