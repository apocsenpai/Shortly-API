import internalServerError from "../utils/functions/internalServerError.js";
import { nanoid } from "nanoid";
import {
  createShortUrl,
  deleteUrlById,
  findUrlById,
  updateUrlVisitCountById,
} from "../repositories/url.repository.js";

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

    const { shortUrl, url } = rows[0];

    res.status(200).send({ id, shortUrl, url });
  } catch (error) {
    internalServerError(res, error);
  }
}

export async function getByShortUrl(req, res) {
  const { id, url } = res.locals.url;

  try {
    await updateUrlVisitCountById(id);

    res.redirect(url);
  } catch (error) {
    internalServerError(res, error);
  }
}

export async function deleteById(req, res) {
  const { id } = res.locals.sanitizedParams;

  try {
    await deleteUrlById(id);

    res.sendStatus(204);
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create, getById, getByShortUrl, deleteById };
