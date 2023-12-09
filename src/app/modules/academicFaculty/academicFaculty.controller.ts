import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req, res)=>{
 const data = req.body;
 const result = await AcademicFacultyService.createAcademicFacultyIntoDB(data);
 
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'academic faculty create successfully',
  data: result,
 })
})

const getAllAcademicFaculty = catchAsync(async(req, res)=>{
 const result = await AcademicFacultyService.getAllAcademicFacultyFromDB();
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'academic faculty retrieve successfully',
  data: result,
 })
})

const getSingleAcademicFaculty = catchAsync(async(req, res)=>{
 const {id} = req.params;
 const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(id);
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'single academic faculty retrieve successfully',
  data: result,
 })
})

const updateSingleAcademicFaculty = catchAsync(async(req, res)=>{
 const {id} = req.params;
 const data = req.body;
 const result = await AcademicFacultyService.updateSingleAcademicFacultyFromDB(id, data);
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'academic faculty update successfully',
  data: result,
 })
})



export const AcademicFacultyController = {
 createAcademicFaculty,
 getAllAcademicFaculty,
 getSingleAcademicFaculty,
 updateSingleAcademicFaculty,
}
