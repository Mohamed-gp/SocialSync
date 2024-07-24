import joi from "joi";

const verifyCreatePost = (obj: object) => {
  const schema = joi.object({
    description: joi.string().min(3).max(50).required(),
  });
  return schema.validate(obj);
};

export { verifyCreatePost };
