"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../controller/Users/User.controller");
const UserRoutes = (0, express_1.Router)();
// UserRoutes.post("/", registerAccount.authenticate("local"), UserQueries.createUser);
UserRoutes.post("/login", User_controller_1.UserQueries.loginAccount);
UserRoutes.get("/", User_controller_1.UserQueries.createUser);
exports.default = UserRoutes;
