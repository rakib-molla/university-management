import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res)=>{
 const data = req.body;
 const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(data);
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Academic Semester is created successfully',
  data: result,
 })

})

const getAllAcademicSemester = catchAsync(async(req, res)=>{
 const result = await AcademicSemesterServices.getAllAcademicSemesterIntoDB();
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'View All Academic Semester Successfully',
  data: result,
 })
})

const getSingleAcademicSemester = catchAsync(async(req, res)=>{
 const {id} = req.params;
 const result = await AcademicSemesterServices.getSingleAcademicSemesterIntoDB(id);
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'View Single Academic Semester Successfully',
  data: result,
 })
})

const updateSingleAcademicSemester = catchAsync(async(req, res)=>{
 const {id}= req.params;
 const data = req.body;
 const result = await AcademicSemesterServices.updateSingleAcademicSemesterIntoDB(id,data);
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'update Single Academic Semester Data',
  data: result,
 })
})

export const AcademicSemesterControllers = {
 createAcademicSemester,
 getAllAcademicSemester,
 getSingleAcademicSemester,
 updateSingleAcademicSemester,
}