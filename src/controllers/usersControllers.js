import { connection } from "../database/db.js"

const getUsers = async (req, res) => {
    
    const { filter }  = req.query

    try {

        const users = await connection.query(`SELECT id, name, "urlImage" FROM users WHERE name ~* $1;`, [filter])
        
        return res.status(200).send(users.rows)
    } catch (error) {
        console.log(error)
       return res.sendStatus(500)
    }
}


const userMe = async (req, res) => {
    
    const { id }  = req.params

    try {
        const posts = await connection.query(`SELECT posts.*, users.name, users."urlImage" FROM posts
        JOIN users
        ON posts."userId" = users.id WHERE "userId" = $1;`, [id])
        return res.status(200).send(posts.rows)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}


export {getUsers, userMe}