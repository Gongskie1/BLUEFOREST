import { Router } from "express";
import { UserQueries } from "../controller/Users/User.controller";
import registerAccount from "../strategies/register-account";

const UserRoutes = Router();

UserRoutes.post("/", registerAccount.authenticate("local"), UserQueries.createUser);
UserRoutes.get("/login", UserQueries.loginAccount);

export default UserRoutes;