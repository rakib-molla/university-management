import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';




const getallStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getallStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
   
    next(error)
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieved successfully ',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.json(201).json({
      success: true,
      message: 'student is Deleted successfully ',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

export const StudentControllers = {
 
  getallStudent,
  getSingleStudent,
  deleteStudent,
};
