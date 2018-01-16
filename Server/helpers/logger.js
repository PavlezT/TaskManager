const winston = require('winston');

exports.logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'verbose-file',
            filename: __dirname + '/../logs/filelog-verbose.log',
            level: 'verbose'
        }),
        new (winston.transports.File)({
            name: 'info-file',
            filename: __dirname + '/../logs/filelog-info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: __dirname + '/../logs/filelog-error.log',
            level: 'error'
        })
    ]
});