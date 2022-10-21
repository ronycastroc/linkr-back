import joi from "joi";

const timelineSchema=joi.object({
    "url":joi.string().required(),
    "id":joi.number().required(),
    "text":joi.string().allow('')
});

const postLinkMiddleware =async(req,res,next)=>{
    const validation = timelineSchema.validate(req.body, { abortEarly: false });
    if(validation.error) {
        const error = validation.error.details.map(value => value.message);
        return res.status(422).send(error);
    }
    next();
}
export {postLinkMiddleware}