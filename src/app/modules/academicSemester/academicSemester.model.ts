import { Schema, model } from "mongoose";
import { TAcademicSemester, } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";



const academicSemesterSchema = new Schema<TAcademicSemester>({
 name:{
  type: String,
  required: true,
  enum: AcademicSemesterName,
 },
 code:{
  type: String,
  required: true,
  enum: AcademicSemesterCode,
 },
 year:{
  type: String,
  required: true,
 },
 startMonth:{
  type: String,
  required: true,
  enum: Months
 },
 endMonth:{
  type: String,
  enum: Months,
 }

},{
 timestamps: true
})

// is already year and semester exist then give me error  middleware 
academicSemesterSchema.pre('save', async function(next){
 const isSemesterExist = await AcademicSemester.findOne({
  year: this.year,
  name: this.name,
 });
 if(isSemesterExist){
  throw new Error("Semester is already exist");
 }
 next();
})

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)