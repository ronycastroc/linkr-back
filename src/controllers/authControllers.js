import { connection } from "../database/db.js";
import joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUpSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
    confirmPassword: joi.string().required(),
    urlImage: joi.string().required()
});

const signUp = async (req, res) => {
    const { name, email, password, confirmPassword, urlImage } = req.body;

    const validation = signUpSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const error = validation.error.details.map(value => value.message);

        return res.status(422).send(error);
    }

    if(password !== confirmPassword) {
        return res.status(422).send("Wrong Password");
    }

    try {
        new URL(urlImage);

        const users = (await connection.query('SELECT * FROM users;')).rows

        const isUser = users.find(value => value.email === email);

        if(isUser) {
            return res.sendStatus(409);
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        await connection.query(`
            INSERT INTO users
                (name, email, password, "urlImage")
            VALUES
                ($1, $2, $3, $4);`, [name, email, passwordHash, urlImage]);
        
        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { signUp };