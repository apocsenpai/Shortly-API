import Joi from "joi";
import { onlyLetterAndSpaces } from "../../utils/constants/regex";
import handleJoiMessage from "../../utils/functions/handleJoiMessages";

const createUserSchema = Joi.object({
  name: Joi.string()
    .pattern(onlyLetterAndSpaces)
    .messages(handleJoiMessage("name"))
    .required(),
  email: Joi.string().email().messages(handleJoiMessage("email")).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string()
    .valid(password)
    .messages(handleJoiMessage("confirmedPassword"))
    .required(),
});

export default createUserSchema;