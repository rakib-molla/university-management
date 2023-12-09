import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/get-all-academic-faculty',AcademicFacultyController.getAllAcademicFaculty);

router.get('/get-single-academic-faculty/:id',AcademicFacultyController.getSingleAcademicFaculty);

router.patch('/update-single-academic-faculty/:id',validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),AcademicFacultyController.updateSingleAcademicFaculty);

export const AcademicFacultyRoutes = router;



