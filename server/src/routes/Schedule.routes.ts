import { Router } from "express";
import scheduleController from "../controller/Schedule/create-schedule.controller";

const schedule = Router();


schedule.post("/schedule", scheduleController.create);
schedule.get("/schedule/:id", scheduleController.display);

export default schedule;