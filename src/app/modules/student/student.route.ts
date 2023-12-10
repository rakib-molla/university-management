import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// route will call controller function


router.get('/all-student', StudentControllers.getallStudent);

router.patch('/:studentId',
validateRequest(updateStudentValidationSchema),
StudentControllers.updateStudent);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
