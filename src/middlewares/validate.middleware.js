import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  email: Joi.string().min(5).max(50).email().required(),
  password: Joi.string().min(8).max(1024).required(),
});

const validate = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ message: error.details[0].message.replace(/"/g, "") });
  next();
};

export default validate;
