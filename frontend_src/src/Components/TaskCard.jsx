import React from 'react'
import CheckedBlue from "../assets/blue-checked.svg"
import AlarmClock from "../assets/alarm-clock.svg"
import Edit from "../assets/edit.svg"
import Delete from "../assets/delete.svg"
import moment from "moment";


const TaskCard = ({task,  showTaskViewScreen, showEditScreen, openDeleteModal}) => {

const handleEdit =(event)=>{
    //stop this event from moving to the parent element
    event.stopPropagation();
    showEditScreen(task)
}

const handleDelete = (event)=>{
    event.stopPropagation();
    openDeleteModal(task)
}

  return (
    <div className='task-tile-container cursor-pointer' onClick={(() => showTaskViewScreen(task))}>
        <span className='task-icon-wrapper'>
            <img src={CheckedBlue} className='task-icon' alt="task"/>
        </span>

        <div className='task-text-wrapper'>
            <p className='task-primary-text'>{task.title}</p>
            <p className='task-secondary-text'>{task.description}</p>
        </div>

        <div className='action-items-container'>
          {/* <img src={AlarmClock} alt='due date'/> */}
          {task.due_date &&(
            <>
            <img src={AlarmClock} alt='due date'/>
            <p>{moment(task.due_date).format("DD MMM YYYY")}</p>
            </>
          )}
        </div>

        <div className='edit-container cursor-pointer' onClick={handleEdit}>
            <img src={Edit} alt="edit task"/>
        </div>

        <div className='delete-container cursor-pointer' onClick={handleDelete}>
            <img src={Delete} alt="delete task"/>
        </div>
    </div>
  )
}

export default TaskCard
