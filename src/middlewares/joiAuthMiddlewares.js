import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
    confirmPassword: joi.string().required(),
    urlImage: joi.string().required()
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required()
});

const validateSignUp = async (req, res, next) => {
    const { name, email, password, confirmPassword, urlImage } = req.body;

    const validation = signUpSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const error = validation.error.details.map(value => value.message);

        return res.status(422).send(error);
    }

    if(password !== confirmPassword) {
        return res.status(422).send("Wrong Password");
    }

    res.locals.user = { name, email, password, urlImage };
    next();
};

const validateSignIn = async (req,res, next) => {
    const { email, password } = req.body;

    const validation = signInSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const error = validation.error.details.map(value => value.message);

        return res.status(422).send(error);
    }

    res.locals.user = { email, password };
    next();
};

export { validateSignUp, validateSignIn };