import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Task from "./../models/task";

const createTask = (request: Request, response: Response, next: NextFunction) => {
    const { name, description, start, finish } = request.body;

    const task = new Task({
        _id: new mongoose.Types.ObjectId,
        name,
        description,
        start,
        finish,
        status: "A Fazer"
    });

    return task
            .save()
            .then((task) => response.status(201).json({ task }))
            .catch((error) => response.status(500).json({ error }));
}