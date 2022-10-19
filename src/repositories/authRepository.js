import { connection } from "../database/db.js";

const listUsers = async () => {
    return (await connection.query('SELECT * FROM users;')).rows;
};

const listUser = async (email) => {
    return (await connection.query('SELECT * FROM users WHERE email=$1;', [email])).rows;
};

const insertUser = async (name, email, passwordHash, urlImage) => {
    return await connection.query(`
        INSERT INTO users
            (name, email, password, "urlImage")
        VALUES
            ($1, $2, $3, $4);`, [name, email, passwordHash, urlImage]);
};

const deleteSession = async (user) => {
    return await connection.query(`
        DELETE FROM sessions 
        WHERE "userId"=$1;`, [user[0].id]);
};

const insertSession = async (user, token) => {
    return await connection.query(`
        INSERT INTO sessions 
            ("userId", token) 
        VALUES 
            ($1, $2);`, [user[0].id, token]);
};

export { listUsers, listUser, insertUser, deleteSession, insertSession };