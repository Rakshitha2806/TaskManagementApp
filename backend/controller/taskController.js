// decission maker
// it recvs the req and decides
// ex: user wants to create a task  
//           it goes to taskModel  : please create this task
// Request => controller => Model => Db

//rcvng req
//getting information from the req
// calling the correct model function
// sending the response

import Task from "../models/taskModel.js";
import apiError from "../utils/ApiError.js";

//   /tasks/5
// Number.isInteger(5) => true
// Number.isInteger(5.5) => false
// Number.isInteger(NaN)  => false


const parseId =(id) =>{                          //id="5"
    const parsed = Number(id);                   // parsed = Number("5") = 5

    //if the id is not a whole number OR the ID is less than 1 conside its as invaluid
    if(!Number.isInteger(parsed) || parsed<1){
    throw apiError(400, "Invalid task id")
    }
    return parsed;
}


const parseBody =({title,description,due_date})=>{

    if(!title || !title.trim()){
        throw apiError(400, "Title is required")
    }

    return {
        title: title.trim(),
        description:description?.trim()|| null,
        due_date:due_date|| null
    }
}

//get all taks
//this function gets all task from the databse and sends them back to the frontend
const getTasks = async(req,res) =>{
    const tasks = await Task.findAll();
    res.json({success: true, tasks, message:"Fetched all tasks successfully"})
}

//crea the ne task
const newTask = async(req,res) =>{
    const task = await Task.create(parseBody(req.body));
    res.status(201).json({success: true, task, message:" Task craeted successfully"})
}

//edit the task

const updateTask = async(req,res) =>{
    const task = await Task.update(parseId(req.params.id), parseBody(req.body));
    if(!task) throw apiError(404, "Task not found")
    res.json({success: true, task, message:"Task updated successfully"})
}

//remove task
const deleteTask =async(req,res) =>{
const task =await Task.remove(parseId(req.params.id));
if(!task) throw apiError(404, "Task not found");
res.json({success: true, message: "Task deleted successfully"})
}

export {getTasks, newTask, updateTask,deleteTask};

