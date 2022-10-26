import { connection } from "../database/db.js"

const getUsers = async (req, res) => {
    
    const { filter }  = req.query

    const { userId } = req.query
    
    try {

        const {rows: followed} = await connection.query(`SELECT follower.id AS id, follower.name, follower."urlImage" FROM users
        JOIN follows
        ON users.id = follows."followerId"
        JOIN users AS "follower"
        ON follower.id = follows."followedId" WHERE follower.name ~* $1 AND users.id = $2;`, [filter, userId])
        
        const {rows: users} = await connection.query(`SELECT id, name, "urlImage" FROM users WHERE name ~* $1;`, [filter])

        followed.map((val) => {
            users.map((val2) => {
                if(val.name.includes(val2.name)){
                    users.splice(val2, 1)
                }
            })
        })

        return res.status(200).send({followed, users})
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
