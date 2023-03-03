import { findUserByEmail } from "../repositories/user.repository.js";
import internalServerError from "../utils/functions/internalServerError.js";

export async function checkUserEmailAlreadyExists(req, res, next) {
  const { email } = res.locals.sanitizedParams;

  try {
    const { rowCount } = await findUserByEmail(email);

    if (rowCount)
      return res.status(409).send({ message: `Email (${email}) already exists` });

    next();
  } catch (error) {
    internalServerError(res, error);
  }
}
