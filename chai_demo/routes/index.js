import { Router } from 'express';
import StudentController from '../controllers/StudentController.js';
const routes = Router();
routes.get('/', StudentController.getAllStudents);
routes.get('/:id', StudentController.getSingleStudent);
export default routes;