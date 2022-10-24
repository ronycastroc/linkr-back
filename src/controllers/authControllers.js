import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../configs/constants.js";
import * as authRepository from "../repositories/authRepository.js";

const signUp = async (req, res) => {
  const { name, email, password, urlImage } = res.locals.user;

  try {
    new URL(urlImage);

    const users = await authRepository.listUsers();

    const isUser = users.find((value) => value.email === email);

    if (isUser) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await authRepository.insertUser(name, email, passwordHash, urlImage);

    res.sendStatus(201);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

const signIn = async (req, res) => {
  const { email, password } = res.locals.user;

  try {
    const user = await authRepository.listUser(email);

    if (user.length === 0 || !bcrypt.compareSync(password, user[0].password)) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ user: user[0].id }, TOKEN_SECRET);

    await authRepository.deleteSession(user);

    await authRepository.insertSession(user, token);

    res.status(200).send({
      name: user[0].name,
      email: user[0].email,
      urlImage: user[0].urlImage,
      userId: user[0].id,
      token,
    });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { signUp, signIn };
