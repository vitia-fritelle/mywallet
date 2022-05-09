import Joi from "joi";
import { CustomValidator } from "joi"
import { ApiError } from "../utils";

const validatePassword: CustomValidator<string> = (value) => {
    
    if (value.length < 8) {
        throw new ApiError(
            422,
            'Password must be at least 8 characters'
        );
    } else if(!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new ApiError(
            422,
            'Password must contain at least 1 letter and 1 number'
        );
    } else {
        return value;
    }
};

export const registerSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(validatePassword),
    name: Joi.string().required(),
});

export const createEntrySchema = Joi.object({
    description: Joi.string().required(),
    value: Joi.number().required()
});