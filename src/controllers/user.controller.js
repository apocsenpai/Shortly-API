import {
  createUser,
  findUserAndUrlByUserId,
} from "../repositories/user.repository.js";
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

async function getById(req, res) {
  const { userId } = res.locals;

  try {
    const { rows: userData } = await findUserAndUrlByUserId(userId);

    const totalVisit = userData
      .map(({ visitCount }) => visitCount)
      .reduce((total, item) => total + item, 0);

    const shortenedUrls = userData.map(
      ({ urlId, shortUrl, url, visitCount }) => {
        return {
          id: urlId,
          shortUrl,
          url,
          visitCount,
        };
      }
    );

    res.send({
      id: userId,
      name: userData[0].name,
      visitCount: totalVisit,
      shortenedUrls,
    });
  } catch (error) {
    internalServerError(res, error);
  }
}

export default { create, getById };
