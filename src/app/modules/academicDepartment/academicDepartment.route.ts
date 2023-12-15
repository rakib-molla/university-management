import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

// router.post(
//  '/create-department',
//  validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentControllers.
//  createAcademicDepartment
// );

router.post(
 '/create-department',
  AcademicDepartmentControllers.
 createAcademicDepartment
);

router.get('/get-all-department',AcademicDepartmentControllers.getAllAcademicDepartment);

router.get('/get-single-department/:id',AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch('/update-single-department/:id',AcademicDepartmentControllers.updateSingleAcademicDepartment);


export const AcademicDepartmentRoutes = router;