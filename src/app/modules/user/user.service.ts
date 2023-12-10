import mongoose from 'mongoose';
import config from '../../config/index';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppErrrors';
import httpStatus from 'http-status';


const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // if (await Student.isUserExists(studentData.id)) {
  //   throw new Error('User Already Exists!');
  // }
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  

  // fond academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

  const session = await mongoose.startSession();

  try{

    session.startTransaction();

    //set manually generated id
  userData.id = await generateStudentId(admissionSemester);

  // create a user (transaction-1)
  const newUser = await User.create([userData], {session}); // array

  // create a student
  if (!newUser.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'fail to create user');
  }
  // set id, _id as user
  payload.id = newUser[0].id; // embedding id
  payload.user = newUser[0]._id; //reference id

  // create a user (transaction-2)
  const newStudent = await Student.create([payload], {session});
  
  if(!newStudent){
    throw new AppError(httpStatus.BAD_REQUEST, 'fail to create student');
  }

  await session.commitTransaction();
  await session.endSession();

  return newStudent;

  }catch(error){
    await session.abortTransaction();
    await session.endSession();
  }


 
};

export const UserServices = {
  createStudentIntoDB,
};
