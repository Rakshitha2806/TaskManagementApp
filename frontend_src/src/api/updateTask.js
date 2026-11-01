// update the existing task
// startLoading
// Build the url
// send PUT request
// wait for the response
// if success
// if error
// stopLoading

// we use values, taskId 

async function updateTaskAPI(taskId, values, handleResponse, handleError, setLoading){

    setLoading(true);

    try
    {
          const baseUrl = import.meta.env.VITE_API_BASE_URL;   // http://localhost:8000
          const endpoint = `/api/v1/task/${taskId}`;           // /api/v1/task/1
          const url = new URL(endpoint, baseUrl);

          const requestBody = JSON.stringify({
              title: values.taskTitle,
              description: values.taskDescription,
              due_date: values.taskDueDate ? values.taskDueDate.toISOString() : null
          });

          // send updated task data to backend api
          const response = await fetch(url, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: requestBody
          });

          const jsonData = await response.json();

          if(!response.ok){
              const errorMessage = jsonData.message || "Unknown error occurred";
              throw new Error(errorMessage);
          }

          handleResponse(jsonData);

    }
    catch(error)
    {
        handleError(error);
    }
    finally
    {
        setLoading(false);
    }

}

export default updateTaskAPI;

