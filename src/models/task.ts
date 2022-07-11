import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITask {
    name: String;
    description: String;
    start: Date;
    finish: Date;
    status: String;
}

export interface ITaskModel extends ITask, Document {}

const TaskSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        start: {
            type: Date,
            required: true
        },
        finish: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }, 
    {
        versionKey: false
    }
);

export default mongoose.model<ITaskModel>('Task', TaskSchema);