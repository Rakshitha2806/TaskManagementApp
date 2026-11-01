import React,{useCallback,useState, useEffect} from 'react'
import Header from './Header'
import NoTask from './NoTask'
import CreateTask from './CreateTask'
import EditTask from './EditTask'
import TaskList from './TaskList'
import ViewTask from './ViewTask'
import DeleteTask from './DeleteTask'
import createTaskAPI from '../api/createTask'
import fetchTasksAPI from '../api/fetchTask'
import deleteTaskAPI from '../api/deleteTask'
import updateTaskAPI from '../api/updateTask'

// const tasks =[
//   {
//     id:1,
//     title:"Buy Jewllery",
//     description:"have to go market on staurday. buy bangles, earings",
//     due_date:"10 sept 2026"
//   },
//   {
//     id:2,
//     title:"Complete Leetcode questions",
//     description:"leetcode questions based on sql",
//     due_date:"11 sept 2026"
//   }

// ]

// const inlineModal = {position:"static", transform:"none", margin:"0 auto"}

const TaskMain = () => {

  //all the tasks coming fom the backend
  const [tasks, setTasks] = useState([])

  //which screen to show
  const [currComponent, setCurrComponent] = useState("taskList")

  //the task the user clicked on (use by edit, dele ,view)
  const [selectedTask, setSelectedTask] = useState(null)

  //modals
  const [showViewModal, setShowViewModal] =useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //loading + error
  const[loading, setLoading] = useState(true);
  const [error,setError] = useState("");

  //show error on screen instead of crashing
  const handleError = useCallback((err)=>{
      setError(err.message || "Something went wrong")
  },[])


  // to get every task from the server and put it in state
  const loadTasks = useCallback(()=>{
    setError("");
    fetchTasksAPI((jsonData)=> setTasks(jsonData.tasks || []), handleError, setLoading)
  }, [handleError])

  // fetch the tasks once, when the app opens
  useEffect(()=>{
    loadTasks();
  },[loadTasks])


  // Navigations functions

  const showCreateTaskScreen = useCallback(()=>{
    setCurrComponent("createTask")
  },[])

  const TaskListScreen = useCallback(()=>{
    setSelectedTask(null);
    setCurrComponent("taskList")
  },[])

  const showEditScreen = useCallback((task) =>{
   setSelectedTask(task);
   setShowViewModal(false);
   setCurrComponent("taskEdit")
  }, [])

  const showTaskViewScreen = useCallback((task)=>{
    setSelectedTask(task);
    setShowViewModal(true)
  },[])

  //create => save it , then reload the list and goback
  const handleCreateTask  = useCallback((values)=>{
    setError("");

    createTaskAPI(
      values, 
      () =>{
        loadTasks();
        setCurrComponent("taskList")
      }, 
      handleError, 
      setLoading);

  },[loadTasks,handleError])


  // UPDATE => save the changes on the selected task
  const handleUpdateTask = useCallback(
    (values) => {
      if(!selectedTask) return;
      setError(" ");
      updateTaskAPI(
        selectedTask.id, 
        values, 
        () => {
          loadTasks();
          setSelectedTask(null)
          setCurrComponent("taskList")
        },
        handleError,
        setLoading
      )
    },
    [selectedTask, loadTasks, handleError]
  )


  const closeViewModal = useCallback(()=>{
    setShowViewModal(false);
    setSelectedTask(null)
  },[])

  const openDeleteModal = useCallback((task) =>{
    setSelectedTask(task);
    setShowDeleteModal(true)
  },[])

  const closeDeleteModal = useCallback(()=>{
    setShowDeleteModal(false);
    setSelectedTask(null)
  })

  // delete => remove it, close the popup and reload the list
  const handleDeleteTask = useCallback(()=>{
    if(!selectedTask) return;
    setError("");
    deleteTaskAPI(
      selectedTask.id,
      ()=>{
        loadTasks();
        setShowDeleteModal(false);
        setSelectedTask(null);
        setCurrComponent("taskList")
      },
      handleError,
      setLoading
    )
  },[selectedTask, loadTasks, handleError])
  


  return (
    <div className='layout-container-div'>
        <Header/>

      {currComponent === "taskList" && 
        (tasks.length === 0 ? (
          <NoTask showCreateTaskScreen ={showCreateTaskScreen }/>
        ):(
            <TaskList tasks={tasks}
             showCreateTaskScreen ={showCreateTaskScreen }
             showTaskViewScreen = {showTaskViewScreen}
             showEditScreen={showEditScreen}
             openDeleteModal={openDeleteModal}
            />
        )
      )}
       
      {currComponent === "createTask" &&(
        <CreateTask handleCreateTask={handleCreateTask}
           TaskListScreen={TaskListScreen}
           loading={loading}
        />
      )} 

      {currComponent === "taskEdit" && selectedTask && (
        <EditTask 
        task={selectedTask}  
        TaskListScreen={TaskListScreen}
        handleUpdateTask={handleUpdateTask}
        />
      )}

      {showViewModal && selectedTask && (
        <>
          <div className='overlay-style'>
          <div className='modal-style view-task-modal'>
            <ViewTask task={selectedTask} 
            closeViewModal={closeViewModal}  
            showEditScreen={showEditScreen} 
            showDeleteScreen={openDeleteModal}
            />
          </div>
      </div>
        </>
      )}
       
      {showDeleteModal && selectedTask && (
        <div className='overlay-style'>
          <div className='modal-style' >
            <DeleteTask task={selectedTask} closeDeleteModal={closeDeleteModal}
            handleDeleteTask = {handleDeleteTask}
            />
          </div>
        </div>
      )}
        
    </div>
  )
}

export default TaskMain
