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
        const { gender, firstname, lastname, phoneNumber, therapyType, schedule } = req.body;
        const scheduleData = {
            data: {
                gender: gender,
                userId: 1,
                firstname: firstname,
                lastname: lastname,
                phoneNumber: phoneNumber,
                schedule: schedule,
                therapyType: therapyType,
            },
        };
        // ghena check niya if naay input na empty
        if (!gender || !firstname || !lastname || phoneNumber || therapyType || schedule) {
            return res.status(400).json({ message: "fill all the inputs" });
        }
        // dri mahitabo pag create ug schedule
        try {
            // mao ning ORM sa prisma naga communicate sa mysql
            const create = yield prisma.schedule.create(scheduleData);
            res.status(200).json({ message: "created" });
        }
        catch (error) {
            console.error("Error creating schedule:", error);
            res.status(500).send({ error: "Failed to create schedule" });
        }
    }),
};
exports.default = scheduleController;
