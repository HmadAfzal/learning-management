import express from 'express';
import { getCourse, listCourses } from '../controllers/course.controllers';


const router = express.Router();

router.get('/',listCourses);
router.get('/:courseId',getCourse);

export default router;

