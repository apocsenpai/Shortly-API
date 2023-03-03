import internalServerError from "../utils/functions/internalServerError.js";
import { nanoid } from "nanoid";
import { createShortUrl, findUrlById } from "../repositories/url.repository.js";

export async function create(req, res) {
  const { url } = res.locals.sanitizedParams;
  const { userId } = res.locals;

  const shortUrl = nanoid();

  try {
    await createShortUrl({ userId, url, shortUrl });

    res.status(201).send({ id: userId, shortUrl });
  } catch (error) {
    internalServerError(res, error);
  }
}

export async function getById(req, res) {
  const { id } = res.locals.sanitizedParams;

  try {
    const { rowCount, rows } = await findUrlById(id);

    if (!rowCount) return res.sendStatus(404);

    const {shortUrl, url } = rows[0];

    res.status(200).send({ id, shortUrl, url });
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create, getById};
