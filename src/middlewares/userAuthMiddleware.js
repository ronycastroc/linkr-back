import { connection } from "../database/db.js";

const validateLoggedUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  const session = await connection.query(
    `SELECT * FROM sessions WHERE token = '${token}';`
  );
  if (session.rowCount === 0) {
    return res.sendStatus(401);
  }
  const userId = session.rows[0].userId;

  const user = await connection.query(
    `SELECT id FROM users WHERE users.id = ${userId}`
  );

  if (user.rowCount === 0) {
    return res.sendStatus(401);
  }
  res.locals.urlImage = user.rows[0].urlImage
  res.locals.userId = userId;
  next();
};

export { validateLoggedUser };
