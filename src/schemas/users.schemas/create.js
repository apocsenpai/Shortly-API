import Joi from "joi";
import { onlyLetterAndSpaces } from "../../utils/constants/regex.js";
import handleJoiMessage from "../../utils/functions/handleJoiMessages.js";

const createUserSchema = Joi.object({
  name: Joi.string()
    .pattern(onlyLetterAndSpaces)
    .messages(handleJoiMessage("name"))
    .required(),
  email: Joi.string()
    .email()
    .messages(handleJoiMessage("email"))
    .required(),
  password: Joi.string().messages(handleJoiMessage("password")).required(),
  confirmPassword: Joi.ref("password"),
});

export default createUserSchema;
