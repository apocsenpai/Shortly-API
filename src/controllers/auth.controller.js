import { createSession } from "../repositories/auth.repository.js";
import internalServerError from "../utils/functions/internalServerError.js";
import { v4 as uuidV4 } from "uuid";

export async function create(req, res) {
  const { userId } = res.locals;

  const token = uuidV4();

  try {
    await createSession({ userId, token });

    res.status(200).send({ token });
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create };
