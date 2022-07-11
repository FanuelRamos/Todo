import express from "express";
import controller from "./../controller/task";

const router = express.Router();

router.post("/create", controller.createTask);
router.get("/:taskId", controller.readTask);
router.get("/", controller.readAllTasks);
router.patch("/update/:taskId", controller.updateTask);
router.delete("/delete/:taskId", controller.deleteTask);

export = router;