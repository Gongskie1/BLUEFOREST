"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const scheduleController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, gender, firstName, lastName, phoneNumber, therapyType, dateTime } = req.body;
        // Validate that all fields are provided
        if (!userId || !gender || !firstName || !lastName || !phoneNumber || !therapyType || !dateTime) {
            return res.status(400).json({ status: false, message: "Please fill all the inputs" });
        }
        // Prepare the schedule data
        const scheduleData = {
            data: {
                userId,
                gender,
                firstname: firstName,
                lastname: lastName,
                phoneNumber,
                therapyType,
                schedule: dateTime,
            },
        };
        try {
            // Create a new schedule
            yield prisma.schedule.create(scheduleData);
            res.status(201).json({ status: true, message: "Schedule created successfully" });
        }
        catch (error) {
            console.error("Error creating schedule:", error);
            res.status(500).json({ status: false, message: "Failed to create schedule" });
        }
    }),
    display: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        try {
            const schedules = yield prisma.schedule.findMany({ where: { userId: id } });
            if (schedules.length === 0) {
                return res.status(200).json({
                    status: 'success',
                    message: 'No schedules found',
                    data: [],
                });
            }
            else {
                return res.status(200).json({
                    status: 'success',
                    message: 'Schedules retrieved successfully',
                    data: schedules,
                });
            }
        }
        catch (error) {
            console.error('Error retrieving schedules:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve schedules',
            });
        }
    })
};
exports.default = scheduleController;
