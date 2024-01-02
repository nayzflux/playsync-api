import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import routes from "./routes";
import prisma from "./lib/prisma";

const PORT = process.env.PORT!;
const SESSION_SECRET = process.env.SESSION_SECRET!;

const app = express();

/**
 * Middlewares
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    name: "session",
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

/**
 * Routes
 */

app.use("/api/v1", routes);

app.listen(PORT, () => console.log(`Server is listening on port :${PORT}`));
