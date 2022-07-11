import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import taskRoutes from "./routes/task";

const app = express();

// Connect to MongoDB Server
mongoose
    .connect(config.mongo.url, {})
    .then(() => {
        console.log("Connected to Database!");
        startServer();
    })
    .catch((error) => {
        console.error(error);
    })

// Initialize the Server
const startServer = () => {
    app.use((request, response, next) => {
        //Log the request
        console.log(`Incomming -> Method: [ ${request.method} ] - URL: [ ${request.url} ] - IP: [ ${request.socket.remoteAddress} ]`);
        response.on('finish', () => {
            //Log the responses
            console.log(`Incomming -> Method: [ ${request.method} ] - URL: [ ${request.url} ] - IP: [ ${request.socket.remoteAddress} ] - Status: [ ${response.statusCode} ]`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //Routes
    app.use("/task", taskRoutes);

    //Error Handling
    app.use((request, response, next) => {
        const error = new Error("Not Found!");
        console.error(error);
        
        return response.status(404).json({ message: error.message });
    });

    //Create the Server
    http.createServer(app).listen(config.server.port, () => {
        console.log("Server Running ...");
    })
}