import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/view-all-academic-semester', AcademicSemesterControllers.getAllAcademicSemester);
router.get('/view-single-academic-semester/:id', AcademicSemesterControllers.getSingleAcademicSemester);
router.patch('/update-single-academic-semester/:id', AcademicSemesterControllers.updateSingleAcademicSemester);
export const AcademicSemesterRoutes = router;
