const winston = require('winston');

exports.logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'verbose-file',
            filename: __dirname + '/../logs/filelog-verbose.log',
            level: 'verbose',
            maxsize: 10000,
            maxFiles: 10
        }),
        new (winston.transports.File)({
            name: 'info-file',
            filename: __dirname + '/../logs/filelog-info.log',
            level: 'info',
            maxsize: 10000000,
            maxFiles: 10
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: __dirname + '/../logs/filelog-error.log',
            level: 'error',
            maxsize: 10000000,
            maxFiles: 10
        })
    ]
});