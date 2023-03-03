import internalServerError from "../utils/functions/internalServerError.js";
import { findUserByEmail } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { findSessionByToken } from "../repositories/auth.repository.js";

export async function checkUserExists(req, res, next) {
  const { email, password } = res.locals.sanitizedParams;

  try {
    const { rowCount, rows: user } = await findUserByEmail(email);

    const passwordIsRight = rowCount && bcrypt.compareSync(password, user[0].password);

    if (!rowCount || !passwordIsRight) return res.sendStatus(401);

    res.locals.userId = user[0].id;

    next();
  } catch (error) {
    internalServerError(res, error);
  }
}

export async function authenticateUser(req, res, next){
  const {authorization} = req.headers;

  const token = authorization?.replace("Bearer ", "");

  if(!token) return res.sendStatus(401);

  try {
    const {rowCount, rows: session} = await findSessionByToken(token)

    if(!rowCount) return res.sendStatus(401);

    res.locals.userId = session[0].userId;

    next();
  } catch (error) {
    internalServerError(res, error)
  }
}