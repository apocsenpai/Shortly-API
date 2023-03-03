import internalServerError from "../utils/functions/internalServerError.js";
import { nanoid } from "nanoid";
import { createShortUrl } from "../repositories/url.repository.js";

export async function create(req, res) {
  const { url } = res.locals.sanitizedParams;
  const { userId } = res.locals;

  const shortUrl = nanoid();
    console.log(shortUrl)
  try {
    await createShortUrl({ userId, url, shortUrl });

    res.status(201).send({ id: userId, shortUrl });
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create };
