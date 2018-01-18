import * as fs from 'fs';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';


 // Create the log directory if it does not exist
if (!fs.existsSync(logDir))
    fs.mkdirSync(logDir);

const tsFormat = () => (new Date()).toLocaleTimeString();

export const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'debug'
        }),
        new (winston.transports.DailyRotateFile)({
            filename: `${logDir}/emulator-`,
            datePattern: 'yyyy-MM-dd.log',
            zippedArchive: true,
            maxDays: 10,
            prepend: false,
            level: env === 'development' ? 'debug' : 'info'
        })
    ]
});