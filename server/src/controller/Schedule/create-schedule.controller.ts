import { Request, Response } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const scheduleController = {
  create: async (req: Request, res: Response) => {
    const { gender, firstname, lastname, phoneNumber, therapyType, schedule } = req.body;
    
    const scheduleData = {
      data: {
        gender: gender,
        userId: 1,
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber,
        schedule:schedule,
        therapyType: therapyType,
      },
    };
    // ghena check niya if naay input na empty
    if(!gender||!firstname||!lastname||phoneNumber||therapyType||schedule){
        return res.status(400).json({message:"fill all the inputs"});
    }
    // dri mahitabo pag create ug schedule
    try {
    // mao ning ORM sa prisma naga communicate sa mysql
      const create = await prisma.schedule.create(scheduleData);
      res.status(200).json({message:"created"});
    } catch (error) {
      console.error("Error creating schedule:", error);
      res.status(500).send({ error: "Failed to create schedule" });
    }
  },
};

export default scheduleController;
