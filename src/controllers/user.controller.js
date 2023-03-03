import { createUser } from "../repositories/user.repository.js";
import internalServerError from "../utils/functions/internalServerError.js";
import bcrypt from "bcrypt";
import saltRounds from "../utils/constants/saltRounds.js";

async function create(req, res) {
  const { name, email, password } = res.locals.sanitizedParams;

  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  try {
    await createUser({ name, email, hashedPassword });

    res.sendStatus(201);
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create };
