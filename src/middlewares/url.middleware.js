import {
  findUrlById,
  findUrlByShortUrl,
} from "../repositories/url.repository.js";
import internalServerError from "../utils/functions/internalServerError.js";

export async function checkShortUrlExists(req, res, next) {
  const shortUrl = req.params.shortUrl;

  try {
    const { rowCount, rows: url } = await findUrlByShortUrl(shortUrl);

    if (!rowCount) return res.sendStatus(404);

    res.locals.url = url[0];

    next();
  } catch (error) {
    internalServerError(res, error);
  }
}

export async function checkUrlIdExist(req, res, next) {
  const { id } = res.locals.sanitizedParams;
  const { userId } = res.locals;

  try {
    const { rowCount, rows } = await findUrlById(id);

    const url = rows[0];

    if (!rowCount) return res.sendStatus(404);

    if (url.userId !== userId) return res.sendStatus(401);

    next();
  } catch (error) {
    internalServerError(res, error);
  }
}
