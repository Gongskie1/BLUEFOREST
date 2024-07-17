import { Router } from "express";
import UserRoutes from "./User.routes";
import schedule from "./Schedule.routes";
const router = Router();

router.use(UserRoutes);
router.use(schedule);
export default router;