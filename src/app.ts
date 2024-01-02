import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import routes from "./routes";
import prisma from "./lib/prisma";

const PORT = process.env.PORT!;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN!;
const SESSION_SECRET = process.env.SESSION_SECRET!;

const app = express();

/**
 * Middlewares
 */

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

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
