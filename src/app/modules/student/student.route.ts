import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// route will call controller function


router.get('/all-student', StudentControllers.getallStudent);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
