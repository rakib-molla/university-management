import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res)=>{
 const data = req.body;
 const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(data);
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Academic Department create successfully',
  data: result,
 })
})

const getAllAcademicDepartment = catchAsync(async (req, res)=>{
 const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'All Academic Department retrieve successfully',
  data: result,
 })
})

const getSingleAcademicDepartment = catchAsync(async (req, res)=>{
 const {id} = req.params;
 const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(id);
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Single Academic Department retrieve successfully',
  data: result,
 })
})
const updateSingleAcademicDepartment = catchAsync(async (req, res)=>{
 const {id} = req.params;
 const data = req.body;
 const result = await AcademicDepartmentServices.updateSingleAcademicDepartmentFromDB(id, data);
 sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Single Academic Department update successfully',
  data: result,
 })
})

export const AcademicDepartmentControllers = {
 createAcademicDepartment,
 getAllAcademicDepartment,
 getSingleAcademicDepartment,
 updateSingleAcademicDepartment,
}

