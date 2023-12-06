import { Router } from "express";
import { UserRoutes } from "../config/modules/user/user.route";
import { StudentRoutes } from "../config/modules/student/student.route";

const router = Router();

const moduleRoutes = [
 {
  path: '/users',
  route: UserRoutes,
 },
 {
  path: '/students',
  route: StudentRoutes,
 },
]

moduleRoutes.forEach(route=> router.use(route.path, route.route))

export default router;