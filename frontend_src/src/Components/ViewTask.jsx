import React from 'react'
import CheckedBlue from "../assets/blue-checked.svg"
import AlarmClock from "../assets/alarm-clock.svg"
import Edit from "../assets/edit.svg"
import Delete from "../assets/delete.svg"
import Cross from "../assets/cross-icon.svg"
import moment from 'moment'


const ViewTask = ({task, closeViewModal, showEditScreen, showDeleteScreen}) => {
  return (
    <>
    <div className='flex justify-between view-task-header'>
        <div className='flex'>
            <span className='task-icon-wrapper'>
                <img src={CheckedBlue} className='task-icon' alt='task'/>
            </span>
            <h2 className='view-task-title'>{task.title}</h2>
        </div>
        <div className='close-modal-btn cursor-pointer' onClick={closeViewModal}>
            <img src={Cross} alt='close'/>
        </div>
    </div>

    <div className='flex align-start'>
        <pre className='view-task-description'>{task.description}</pre>
        <div className='view-task-right-section'>
            <div className='view-task-info-box'>
              <p className='label-14'>Due Date</p>
              <div className='flex date-container'>
                {/* <img src={AlarmClock} alt="due date"/> */}
                {/* <p className='date-text'>{task.due_date}</p> */}
                {task.due_date &&(
                    <>
                    <img src={AlarmClock} alt='due date' style={{ marginRight: "6px" }}/>
                    <p>{moment(task.due_date).format("DD MMM YYYY")}</p>
                    </>
                )}
              </div>
            </div>

            <div className='view-task-info-box flex cursor-pointer' onClick={() => showEditScreen(task)}>
                <img src={Edit} width={16} height={16} alt='edit task'/>
                <p className='label-12'>Edit Task</p>
            </div>

                <div className='view-task-info-box flex cursor-pointer' onClick={() => showDeleteScreen(task)}>
                <img src={Delete} width={16} height={16} alt='delete task'/>
                <p className='label-12'>Delete Task</p>
            </div>

        </div>
    </div>

    </>
  )
}

export default ViewTask
