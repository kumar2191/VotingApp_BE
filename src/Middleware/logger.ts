import { createLogger, transports, format } from "winston";


const logger = createLogger({
    transports: [new transports.Console(), new transports.File({
        dirname: "Logs",
        filename: "Logs",
      })],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
  });

  export default logger