import Joi from 'joi';

export const SignInValidator = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        // TODO: describe messages
        .messages({
            'string.pattern base': 'Username doesn`t much pattern'
        }),
    password: Joi.string()
        .min(6)
        .max(20)
        .pattern(/^[a-zA-Z0-9!@#$%^&*()_+={}[\]:;"'<>,.?/-]*$/)
        .required()
        // TODO: describe messages
        .messages({
            'string.pattern base': 'Password doesn`t much pattern',
            'number.min': 'min len is 6',
            'number.max': 'max len is 20'
        }),
});