import { findAllUrlDataGroupedByUserId } from "../repositories/ranking.repository.js";
import internalServerError from "../utils/functions/internalServerError.js";

async function getAll(req, res) {
  try {
    const { rows: ranking } = await findAllUrlDataGroupedByUserId();

    res.send(ranking);
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { getAll };
