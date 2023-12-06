import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
 try {
   // creating a schema validation using zod

   const { password ,student: studentData } = req.body;

   // const zodParseData = studentValidationSchema.parse(studentData);

   

   // will call service function to send this data
   const result = await UserServices.createStudentIntoDB(password, studentData);

   // if(error){
   //   res.status(500).json({
   //     success: false,
   //     message: 'something wrong',
   //     error: error.details,
   //   })
   // }

   // send response
   res.status(200).json({
     success: true,
     message: 'Student is created successfully',
     data: result,
   });
 } catch (error: any) {
   res.status(500).json({
     success: false,
     message: error.message || 'something went wrong',
     error: error,
   });
 }
};

export const UserControllers ={
 createStudent
}