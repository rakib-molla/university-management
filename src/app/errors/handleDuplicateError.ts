import { TErrorSources, TGenericErrorResponse } from "../interface/error";


const handleDuplicateError =(err: any): TGenericErrorResponse=>{

 const match = err.message.match(/"([^"]*)"/);
 const extracted_msg = match && match[1];

 const errorSources: TErrorSources =[
  {
   path: err.keyValue,
   message:  `${extracted_msg} is already Exists`,
  }
 ]

 const statusCode = 400;
 return{
  statusCode,
  message: "Duplicate Error",
  errorSources,
 }
}

export default handleDuplicateError;