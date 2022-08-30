const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      level: "error",
      filename: "./logs/error.log",
    }),
    new winston.transports.MongoDB({
      level: "error",
      db: "mongodb://localhost/academia",
    }),
  ],
});

logger.exceptions.handle(
  new winston.transports.File({ filename: "./logs/exceptions.log" })
);

module.exports = logger;
