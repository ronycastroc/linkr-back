import { connection } from "../database/db.js";


async function listComments (req, res){
const { postId } = req.params;

try {
    const post = (await connection.query(`SELECT * FROM posts WHERE id= $1;`,[postId])).rows
    
    if(post.length === 0){
        return res.status(404).send('Post não encontrado');
    }

    const listPosts = (await connection.query(`SELECT * FROM comments WHERE "postId" = $1;`,[postId])).rows;
    
    return res.status(200).send(listPosts)
} catch (error) {
    console.log(error);
    return res.sendStatus(500);
}

}

export { listComments }


//insertComments

// const { userId } = req.body; 
// const { postId } = req.params;

// //validar o body com joy
// try {
    
//     const post = (await connection.query(`SELECT * FROM posts WHERE id= $1;`,[postId])).rows
//     if(post.length === 0){
//         return res.sendStatus(404);
//     }
  
//     const userName = (await connection.query(`SELECT name FROM users WHERE id = $1;`,[userId])).rows

      
    
//     res.send(userName)

    
// } catch (error) {
//     console.log(error);
//     return res.sendStatus(500);    
// }