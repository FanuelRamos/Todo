import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from "express";
import { ITask } from "./../models/task";

export const ValidateRequestBody = (schema: ObjectSchema) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(request.body);

            next();
        } catch (error) {
            console.error(error);
            return response.status(422).json({ error });
        }
    };
}

export const Schemas = {
    task: {
        create: Joi.object<ITask>({
            name: Joi.string().required(),
            description: Joi.string().required(),
            start: Joi.date().required(),
            finish: Joi.date().required()
        }),
        update: Joi.object<ITask>({
            name: Joi.string().required(),
            description: Joi.string().required(),
            start: Joi.date().required(),
            finish: Joi.date().required(),
            status: Joi.string().required()
        }),
    }
}