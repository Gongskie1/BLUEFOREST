import { Request, Response } from "express";
import { PrismaClient, Schedule } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

const scheduleController = {
  
  create: async (req: Request, res: Response) => {
    const { userId, year, month, day, time, therapyType } = req.body;
    const MAX_CLIENTS_PER_DAY = 5;
  // Validate that all fields are provided
    if (!userId || !year || !month || !day || !time || !therapyType) {
      return res.status(400).json({ status: false, message: "Please fill all the inputs" });
    }

    try {
      // Check the number of existing schedules for the given date
      const existingSchedulesCount = await prisma.schedule.count({
        where: {
          year,
          month,
          day
        }
      });

      // Check if the time slot is already booked
      const existingTimeSlot = await prisma.schedule.findFirst({
        where: {
          year,
          month,
          day,
          time
        }
      });

      if (existingSchedulesCount >= MAX_CLIENTS_PER_DAY) {
        return res.status(400).json({ status: false, message: `Cannot schedule more than ${MAX_CLIENTS_PER_DAY} clients per day` });
      }

      if (existingTimeSlot) {
        return res.status(400).json({ status: false, message: `Time slot ${time} is already booked` });
      }

      // Create a new schedule
      await prisma.schedule.create({
        data: {
          userId,
          year,
          month,
          day,
          time,
          therapyType
        }
      });

      res.status(201).json({ status: true, message: "Schedule created successfully" });
    } catch (error) {
      console.error("Error creating schedule:", error);
      res.status(500).json({ status: false, message: "Failed to create schedule" });
    }
  },
  

  display: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
  
    try {
      const schedules = await prisma.schedule.findMany({ where: { userId: id } });
  
      if (schedules.length === 0) {
        return res.status(200).json({
          status: 'success',
          message: 'No schedules found',
          data: [],
        });
      } else {
        return res.status(200).json({
          status: 'success',
          message: 'Schedules retrieved successfully',
          data: schedules,
        });
      }
    } catch (error) {
      console.error('Error retrieving schedules:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve schedules',
      });
    }
  },

  displayAll: async (req: Request, res: Response) => {
    try {
      const schedules = await prisma.schedule.findMany();
      
      if (schedules.length === 0) {
        return res.status(200).json({
          status: 'success',
          message: 'No schedules found',
          data: [],
        });
      } else {
        return res.status(200).json({
          status: 'success',
          message: 'All schedules retrieved successfully',
          data: schedules,
        });
      }
    } catch (error) {
      console.error('Error retrieving all schedules:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve all schedules',
      });
    }
  },

  acceptSchedule: async (req: Request, res: Response) => {
    const scheduleId = parseInt(req.params.id, 10);

    try {
      // Update schedule status to "Accepted"
      const updatedSchedule = await prisma.schedule.update({
        where: { id: scheduleId },
        data: { status: "Accepted" },
      });

      res.status(200).json({
        status: 'success',
        message: 'Schedule accepted successfully',
        data: updatedSchedule,
      });
    } catch (error) {
      console.error('Error accepting schedule:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to accept schedule',
      });
    }
  },

  deleteSchedule: async (req: Request, res: Response) => {
    const scheduleId = parseInt(req.params.id, 10);
  
    try {
      // Check if the schedule exists
      const existingSchedule = await prisma.schedule.findUnique({
        where: { id: scheduleId },
      });
  
      if (!existingSchedule) {
        return res.status(404).json({
          status: "error",
          message: `Schedule with ID ${scheduleId} not found`,
        });
      }
  
      // Insert the schedule data into the AuditLog table
      await prisma.auditLog.create({
        data: {
          action: "rejected",
          status: existingSchedule.status,
          quantity: existingSchedule.quantity,
          userId: existingSchedule.userId,
          year: existingSchedule.year,
          month: existingSchedule.month,
          day: existingSchedule.day,
          time: existingSchedule.time,
          therapyType: existingSchedule.therapyType,
          createdAt: existingSchedule.createdAt,
          updatedAt: existingSchedule.updatedAt,
        },
      });
  
      // Delete the schedule
      await prisma.schedule.delete({
        where: { id: scheduleId },
      });
  
      return res.status(200).json({
        status: "success",
        message: `Schedule with ID ${scheduleId} deleted successfully and logged in AuditLog`,
      });
    } catch (error) {
      console.error("Error deleting schedule:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to delete schedule",
      });
    }
  },
  getAuditLogs: async (req: Request, res: Response) => {
    try {
      const auditLogs = await prisma.auditLog.findMany();
      return res.status(200).json({
        status: "success",
        data: auditLogs,
      });
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch audit logs",
      });
    }
  },
};

export default scheduleController;
