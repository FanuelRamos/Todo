import express from "express";
import controller from "./../controller/task";
import { Schemas, ValidateRequestBody } from "./../middleware/validateRequestBody"

const router = express.Router();

router.post("/create", ValidateRequestBody(Schemas.task.create), controller.createTask);
router.get("/:taskId", controller.readTask);
router.get("/", controller.readAllTasks);
router.patch("/update/:taskId", ValidateRequestBody(Schemas.task.update), controller.updateTask);
router.delete("/delete/:taskId", controller.deleteTask);

export = router;