import { Router } from "express";
import scheduleController from "../controller/Schedule/create-schedule.controller";

const schedule = Router();


schedule.post("/schedule", scheduleController.create);
schedule.get("/schedule", scheduleController.displayAll);
schedule.get("/schedule/:id", scheduleController.display);
schedule.put("/schedule/:id/accept", scheduleController.acceptSchedule);
schedule.delete("/schedule/:id", scheduleController.deleteSchedule);


export default schedule;