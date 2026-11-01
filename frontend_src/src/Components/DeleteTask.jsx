import React from 'react'
import Info from "../assets/info.svg"
import Cross  from "../assets/cross-icon.svg"

const DeleteTask = ({task, closeDeleteModal, handleDeleteTask}) => {
  return (
    <>
      <div className='delete-task-container'>
          <div className='delete-task-header'>
            <img src={Info} className='delete-popup-info-icon' alt="info"/>
            <div className='close-modal-btn cursor-pointer' onClick={closeDeleteModal}>
                <img src={Cross} alt='close'/>
            </div>
          </div>

          <div className='delete-popup-content'>

            <p className='delete-task-text delete-task-title'>Delete Task</p>
            <p className='delete-task-text'>Do You want to delete {task.title} ? </p>

            <div className='delete-action-btns'>
                <button className='btn delete-btn cursor-pointer' onClick={handleDeleteTask}>Delete</button>
                <button className='btn cancel-btn cursor-pointer' onClick={closeDeleteModal}>Cancel</button>
            </div>
          </div>
      </div>
    </>
  )
}

export default DeleteTask
