//to connect req/urls to controller function

//Router decides which controller should run 
// Controller decides what the application do

import express from "express";
import {getTasks, newTask, updateTask,deleteTask} from "../controller/taskController.js"

const router = express.Router();

router.post("/task", newTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;

