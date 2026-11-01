// get all the tasks from backend server
// we are using GET method

async function fetchTasksAPI(handleResponse, handleError, setLoading){
    setLoading(true);
    try{
        // base url for the endpoint, stored .env file
        const baseUrl = import.meta.env.VITE_API_BASE_URL;   //http://localhost:8000
        const endpoint = "/api/v1/tasks";                     // /api/v1/tasks
        const url = new URL(endpoint,baseUrl);

        // send GET req, to the constructed URL to fetch tasks
        const response = await fetch(url)

        // extract JSON data from the response
        const jsonData = await response.json();

        // check if response is not successfull
        if(!response.ok){
            const errorMessage = jsonData.message || "Unknown error occured";
            throw new Error(errorMessage)
        };

        // pass the fetched tasks data to the handleResponse function for further logic
        handleResponse(jsonData)
    }catch(error){
        handleError(error)
    }
    finally{
        setLoading(false)
    }
}

export default fetchTasksAPI;

