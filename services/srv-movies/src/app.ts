import express from "express";
import * as Logger from "signale";
import { init } from "./loaders";

export async function startServer() {
  const app = express();

  await init(app);

  const server = app.listen(process.env.PORT, () => {
    Logger.success("Server is listening on port: %s", process.env.PORT || 3001);
  });

  return { app, server };
}

startServer();

// Handle warning and errors.
process.on("unhandledRejection", (reason, promise) => {
  Logger.warn("Unhandled Rejection at: %s, reason: %s", promise, reason);
});

process.on("warning", (warning) => {
  Logger.warn(
    "Node.js warning -> name: %s , message: %s , stack: %s",
    warning.name,
    warning.message,
    warning.stack
  );
});
