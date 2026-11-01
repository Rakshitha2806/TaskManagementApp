import React, {useState} from 'react'
import InputField from './UI/InputField'
import UserIcon from "../assets/user-icon.png"
import TitleImg from "../assets/title-placeholder-img.svg"
import Memo from "../assets/memo.svg"
import Calendar from "../assets/calendar.svg"

const CreateTask = ({handleCreateTask, TaskListScreen, loading}) => {
   const [values, setValues] = useState({
    taskTitle:"",
    taskDescription:"",
    taskDueDate:null,
   });

   const handleChange =(event)=>{
    const{name,value} = event.target;
    setValues((prev) => ({...prev, [name] : value}))
   }

   const handleDateChange = (date) =>{
    setValues((prev) => ({...prev, taskDueDate:date}))
   }

//    const isDisabled = !values.taskTitle.trim()|| loading;

   const onAddTask =() =>{
    // if(isDisabled)return;
    handleCreateTask(values)
   }

  return (
    <div className='content-section create-task-section'>
        <div className='create-task-card'>
            <img src={UserIcon} width={263} alt="user icon"/>
            <h1 className='create-task-title-text'>
                Create New Task
            </h1>
            <InputField
            name="taskTitle"
            value={values.taskTitle}
            label="Title"
            type="text"
            inputImg={TitleImg}
            placeholder="Title"
            onChange={handleChange}
            />
            <InputField
            name="taskDescription"
            value={values.taskDescription}
            label="Description"
            type="textarea"
            inputImg={Memo}
            placeholder="Description"
            className="input-margin"
            onChange={handleChange}
            />
            <InputField
            name="taskDueDate"
            value={values.taskDueDate}
            label="Due date"
            type="date"
            inputImg={Calendar}
            placeholder="Due Date"
            className="input-margin"
            onChange={handleDateChange}
            />

            <div className='add-edit-task-btns'>
                <button className='btn add-task-btn cursor-pointer' onClick={onAddTask}>Add Task</button>
                <button className='btn cancel-btn cursor-pointer' onClick={TaskListScreen}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
export default CreateTask
