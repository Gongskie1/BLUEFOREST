"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_schedule_controller_1 = __importDefault(require("../controller/Schedule/create-schedule.controller"));
const schedule = (0, express_1.Router)();
schedule.post("/schedule", create_schedule_controller_1.default.create);
schedule.get("/schedule", create_schedule_controller_1.default.displayAll);
schedule.get("/schedule/:id", create_schedule_controller_1.default.display);
schedule.put("/schedule/:id/accept", create_schedule_controller_1.default.acceptSchedule);
schedule.delete("/schedule/:id", create_schedule_controller_1.default.deleteSchedule);
exports.default = schedule;
