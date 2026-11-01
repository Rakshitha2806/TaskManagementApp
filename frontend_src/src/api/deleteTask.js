// deleting the existing task
// we are using taskId

async function deleteTaskAPI(taskId, handleResponse, handleError, setLoading) {

    setLoading(true);

    try {
        // base url for the endpoint, stored .env file
        const baseUrl = import.meta.env.VITE_API_BASE_URL; // http://localhost:8000
        const endpoint = `/api/v1/task/${taskId}`;         // /api/v1/task/1
        const url = new URL(endpoint, baseUrl);

        // Send DELETE request to backend API
        const response = await fetch(url, {
            method: "DELETE",
        });

        const jsonData = await response.json();

        // Check if response is not successful
        if (!response.ok) {
            const errorMessage = jsonData.message || "Unknown error occurred";
            throw new Error(errorMessage);
        }

        handleResponse(jsonData);

    } catch (error) {
        handleError(error);

    } finally {
        setLoading(false);
    }
}

export default deleteTaskAPI;

