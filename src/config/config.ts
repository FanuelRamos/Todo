import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = "mongodb://0.0.0.0:27017/todo";
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}