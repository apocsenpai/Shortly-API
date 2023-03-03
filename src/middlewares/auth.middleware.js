import internalServerError from "../utils/functions/internalServerError.js";
import { findUserByEmail } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

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
