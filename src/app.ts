import express from "express";
import {accessLogger,errorLogger,consoleLogger,} from "./api/v1/middleware/errorlogger";
import errorHandler from "./api/v1/middleware/errorHandler";
import loanroutes from "./api/v1/routes/loanroutes";
import userroutes from "./api/v1/routes/userroutes";
import roleroutes from "./api/v1/routes/roleroutes";

const app = express();

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

// Body parsing middleware
app.use(express.json());

// API Routes
app.use("/api/v1",loanroutes);

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

app.use("/api/v1/roles", roleroutes);

app.use("/api/v1/users", userroutes);

export default app;