import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
 try {
   // creating a schema validation using zod

   const { password ,student: studentData } = req.body;

   // const zodParseData = studentValidationSchema.parse(studentData);

   // will call service function to send this data
   const result = await UserServices.createStudentIntoDB(password, studentData);


   // send response
   res.status(200).json({
     success: true,
     message: 'Student is created successfully',
     data: result,
   });
 } catch (error) {
   next(error)
 }
};

export const UserControllers ={
 createStudent
}