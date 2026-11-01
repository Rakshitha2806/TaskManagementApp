const apiError =(status,message)=>{
const err = new Error(message);
err.status =status;
return err;
}
export default apiError;

//Req => something went wrong => create api error => add status + msg
//=> throw it => Error handler sends response








// class ApiError extends Error{
//     constructor(status, message){
//         super(message);
//         this.status = status;
//     }
// }

// export default ApiError;

