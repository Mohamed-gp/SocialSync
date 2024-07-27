import joi from "joi";
import joiPasswordComplexity from "joi-password-complexity";

const verifyUpdateUser = (obj: object) => {
  const schema = joi
    .object({
      username: joi.string().min(3).max(50).required().allow(""),
      location: joi.string().min(3).max(50).required().allow(""),
      occupation: joi.string().min(2).max(50).required().allow(""),
      bio: joi.string().min(2).max(50).required().allow(""),
    })
    .unknown(true);
  return schema.validate(obj);
};

export { verifyUpdateUser };
