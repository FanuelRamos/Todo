import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Task from "./../models/task";

// Create Task Function
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

// Read a single Task acording the given ID
const readTask = (request: Request, response: Response, next: NextFunction) => {
    const taskId = request.params.taskId;

    return Task.findById(taskId)
            .then((task) => (task ? response.status(200).json({ task }) : response.status(404).json({
                message: "Not Found!"})))
            .catch((error) => response.status(500).json({ error }));
}

// Read all task
const readAllTasks = (request: Request, response: Response, next: NextFunction) => {
    return Task.find()
            .then((tasks) => (tasks ? response.status(200).json({ tasks }) : response.status(404).json({
                message: "Not Found!"})))
            .catch((error) => response.status(500).json({ error }));
}

// Update Task function
const updateTask = (request: Request, response: Response, next: NextFunction) => {
    const taskId = request.params.taskId;

    return Task.findById(taskId)
            .then((task) => {
                if(task) {
                    task.set(request.body);

                    return task
                            .save()
                            .then((task) => response.status(201).json({ task }))
                            .catch((error) => response.status(500).json({ error }))
                } else {
                    response.status(404).json({ message: "Not Found!" });
                }
            })
            .catch((error) => response.status(500).json({ error }));
}

//Delete task function
const deleteTask = (request: Request, response: Response, next: NextFunction) => {
    const taskId = request.params.taskId;

    return Task.findByIdAndDelete(taskId)
            .then((task) => (task ? response.status(201).json({ message: 'Deleted' }) : response.status(404)
            .json({ message: 'Not Found!'})))
            .catch((error) => response.status(500).json({ error }));
}

export default { createTask, readTask, readAllTasks, updateTask, deleteTask };