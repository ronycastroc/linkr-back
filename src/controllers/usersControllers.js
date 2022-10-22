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

export {getUsers}