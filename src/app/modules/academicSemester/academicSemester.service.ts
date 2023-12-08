

import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async(payload: TAcademicSemester)=>{

 // academicSemesterNameCodeMapper['fall']  check semester name and code are same or not
 if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
  throw new Error("Invalid Semester Code or name");
 }

 const result = await AcademicSemester.create(payload);
 
 return result;

}

const getAllAcademicSemesterIntoDB = async()=>{
 const result = await AcademicSemester.find();
 return result;
}

const getSingleAcademicSemesterIntoDB = async(_id: string)=>{
 const result = await AcademicSemester.findById(_id);
 return result
}

const updateSingleAcademicSemesterIntoDB = async(_id: string, payload: Partial<TAcademicSemester>)=>{
 if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code){
  throw new Error('Invalid semester code or name');
 }
 const result = await AcademicSemester.updateOne({_id: _id}, payload,{new: true});
 return result;
}

export const AcademicSemesterServices = {
 createAcademicSemesterIntoDB,
 getAllAcademicSemesterIntoDB,
 getSingleAcademicSemesterIntoDB,
 updateSingleAcademicSemesterIntoDB
}