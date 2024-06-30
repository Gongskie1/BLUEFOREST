"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../controller/Users/User.controller");
const register_account_1 = __importDefault(require("../strategies/register-account"));
const UserRoutes = (0, express_1.Router)();
UserRoutes.post("/", register_account_1.default.authenticate("local"), User_controller_1.UserQueries.createUser);
UserRoutes.get("/login", User_controller_1.UserQueries.loginAccount);
exports.default = UserRoutes;
