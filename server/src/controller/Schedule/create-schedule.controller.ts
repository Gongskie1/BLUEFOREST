import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const scheduleController = {
  create: async (req: Request, res: Response) => {
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
      await prisma.schedule.create(scheduleData);
      res.status(201).json({ status: true, message: "Schedule created successfully" });
    } catch (error) {
      console.error("Error creating schedule:", error);
      res.status(500).json({ status: false, message: "Failed to create schedule" });
    }
  },
};

export default scheduleController;
