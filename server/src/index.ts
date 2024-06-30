import express from "express";
import routes from "./routes/index.routes";
import session from "express-session";
import passport from "passport";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: "Project Sa Information Security.",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60, 
    },
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(routes);

app.listen(port, () => {
    console.log(`This port running on port ${port}`);
});
