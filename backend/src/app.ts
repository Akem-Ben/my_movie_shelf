import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";
// import apiRouter from "./routes";
import dotenv from 'dotenv';
import { createServer } from "http";

const app = express();

const server = createServer(app);

dotenv.config()

// Set security HTTP headers to disable 'powered by Express' header feature
app.disable("x-powered-by");

// Set security HTTP headers
app.use(helmet());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Compress response to increase speed
app.use(compression());

// Set Cors
app.use(cors());

//Other Middlewares
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

// Database

// Routes
// app.use("/api", apiRouter);


// Health Check Endpoint
app.get("/", (request: Request, response: Response) => {
  response.send("Welcome to My Movie Shelf Backend Server. 👋");
});


// Error handler
// app.use(errorUtilities.globalErrorHandler);

const PORT = 3000

/**
 * Server
 */
server.listen(PORT, () => {
  console.log(`server running on Port ${PORT}`);
});

export default app;
