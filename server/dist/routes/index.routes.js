"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_routes_1 = __importDefault(require("./User.routes"));
const Schedule_routes_1 = __importDefault(require("./Schedule.routes"));
const router = (0, express_1.Router)();
router.use(User_routes_1.default);
router.use(Schedule_routes_1.default);
exports.default = router;
