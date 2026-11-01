// Adding the task
//Turn on loading spinner
//make a POST req to the backend API
// send task data in json format
//wait for the server to respond
//if success: call handleResponse with the data
//if error : call handleError
// turnoff loading spinner

async function createTaskAPI(values,handleResponse, handleError, setLoading){

    setLoading(true);

    try
    {
          const baseUrl = import.meta.env.VITE_API_BASE_URL;   //http://localhost:8000
          const endpoint = "/api/v1/task";                           // /api/v1/task
          const url = new URL(endpoint,baseUrl);
          // url: http://localhost:8000/api/v1/task

          const requestBody = JSON.stringify({
           title:values.taskTitle,
           description:values.taskDescription,
           due_date: values.taskDueDate ? values.taskDueDate.toISOString() : null
          })

          // send task data to backend api
          const response = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            }, 
            body:requestBody
          })

          const jsonData = await response.json();

          if(!response.ok){
            const errorMessage = jsonData.message || "Unknown error occured";
            throw new Error(errorMessage)
          }

          handleResponse(jsonData)

    }
    catch(error)
    {
        handleError(error)
    }
    finally
    {
      setLoading(false)
    }

}

export default createTaskAPI;

