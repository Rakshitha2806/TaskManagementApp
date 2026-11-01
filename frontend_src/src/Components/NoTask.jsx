import React from 'react'
import UserIcon from "../assets/user-icon.png"
import FolderWhite from "../assets/folder-white.svg"

const NoTask = ({showCreateTaskScreen }) => {
  return (
    <div  className='flex flex-col items-center justify-center content-section'>
      <div className='content-section-container flex flex-col justify-center'>
        <img src={UserIcon} alt="userIcon"/>
        <h1 className='no-task-primary-text'>Woohoo, you're all done!</h1>
        <p  className='n0-task-secondary-text'>There are no tasks added yet. Click button to add a new task</p>
        <button className='btn btn-purple create-task-btn' onClick={showCreateTaskScreen}>
            <img src={FolderWhite} alt="folder" />
            Create New Task
        </button>
      </div>
    </div>
  )
}

export default NoTask
