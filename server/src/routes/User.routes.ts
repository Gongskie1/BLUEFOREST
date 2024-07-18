import { Router } from "express";
import { UserQueries } from "../controller/Users/User.controller";
import registerAccount from "../strategies/register-account";

const UserRoutes = Router();

// UserRoutes.post("/", registerAccount.authenticate("local"), UserQueries.createUser);
UserRoutes.post("/login", UserQueries.loginAccount);
UserRoutes.get("/", UserQueries.createUser);
UserRoutes.post("/register", UserQueries.createUser);

export default UserRoutes;