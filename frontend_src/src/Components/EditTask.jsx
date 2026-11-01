import React,{useState} from 'react'
import InputField from './UI/InputField'
import EditTaskLogo from "../assets/edit-task-logo.svg"
import TitleImg from "../assets/title-placeholder-img.svg"
import Memo from "../assets/memo.svg"
import Calendar from "../assets/calendar.svg"

const EditTask = ({task, TaskListScreen, handleUpdateTask}) => {

    const [values, setValues] = useState({

        taskTitle: task.title || " ",
        taskDescription:task.description || " ",
        taskDueDate: task.due_date ? new Date(task.due_date):null
    })

    const handleChange =(event)=>{
    const{name,value} = event.target;
    setValues((prev) => ({...prev, [name] : value}))
   }

   const handleDateChange = (date) =>{
    setValues((prev) => ({...prev, taskDueDate:date}))
   }

   // const isDisabled = !values.taskTitle.trim()|| loading;

   const onSaveTask =() =>{
    // if(isDisabled)return;
    handleUpdateTask(values)
   }

  return (
    <div className='content-section create-task-section'>
        <div className='create-task-card'>
            <img src={EditTaskLogo} width={263} alt="user icon"/>
            <h1 className='create-task-title-text'>
                Edit Task
            </h1>
            <InputField
            name="taskTitle"
            value={values.taskTitle}
            onChange={handleChange}
            label="Title"
            type="text"
            inputImg={TitleImg}
            placeholder="Title"
            // value={task.title}
            />
            <InputField
            name="taskDescription"
            value={values.taskDescription}
            onChange={handleChange}
            label="Description"
            type="textarea"
            inputImg={Memo}
            placeholder="Description"
            className="input-margin"
            // value={task.description}
            />
            <InputField
            name="taskDueDate"
            value={values.taskDueDate}
            onChange={handleDateChange}
            label="Due date"
            type="date"
            inputImg={Calendar}
            placeholder="Due Date"
            className="input-margin"
            // value={task.due_date}
            />

            <div className='add-edit-task-btns'>
                <button className='btn add-task-btn cursor-pointer' onClick={onSaveTask}>Save Task</button>
                <button className='btn cancel-btn cursor-pointer' onClick={TaskListScreen}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
export default EditTask;
