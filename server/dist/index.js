"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const port = 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "Project Sa Information Security.",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    },
    store: new prisma_session_store_1.PrismaSessionStore(new client_1.PrismaClient(), {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    })
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(index_routes_1.default);
app.listen(port, () => {
    console.log(`This port running on port ${port}`);
});
