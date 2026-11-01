import React from 'react'
import TaskCard from './TaskCard'
import FolderImg from "../assets/folder-white.svg"

const TaskList = ({tasks, showCreateTaskScreen, showTaskViewScreen, showEditScreen, openDeleteModal }) => {
  return (
    <div className='task-list-screen content-section'>
        <div className='content-section-container'>
            <div className='task-list-header-main'>
             <p className='task-heading'>Task</p>
             <button className='add-task-btn cursor-pointer' 
                 onClick={showCreateTaskScreen }>
               <img src={FolderImg} alt="folder"/>
               Add New Task
             </button>
            </div>

            <div className='task-list-container'>
               {tasks.map((task)=>(
                 <TaskCard key={task.id} task={task}  showTaskViewScreen={ showTaskViewScreen}
                 showEditScreen={showEditScreen} openDeleteModal={openDeleteModal}
                 />
               ))}
            </div>

        </div>
    </div>
  )
}

export default TaskList
