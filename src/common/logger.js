import winston from 'winston';
import {format} from 'winston';


const {printf, timestamp, label, combine} = format;
const logFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: 'logger' }),
        timestamp(),
        logFormat
    ),
    defaultMeta: {service: 'user-service'},
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console());
} else {
    logger.add(new winston.transports.File({ filename: 'combined.log' }));
}

export default logger;