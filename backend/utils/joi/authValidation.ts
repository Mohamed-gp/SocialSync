import joi from "joi";
import joiPasswordComplexity from "joi-password-complexity";

const verifyRegister = (obj: object) => {
  const schema = joi.object({
    username: joi.string().min(3).max(50).required(),
    location: joi.string().min(3).max(50).required().allow(""),
    occupation: joi.string().min(2).max(50).required().allow(""),
    email: joi.string().min(8).max(50).required().email(),
    password: joiPasswordComplexity(),
  });
  return schema.validate(obj);
};
const verifyLogin = (obj: object) => {
  const schema = joi.object({
    email: joi.string().min(8).max(50).required().email(),
    password: joiPasswordComplexity(),
  });
  return schema.validate(obj);
};

export { verifyRegister, verifyLogin };
