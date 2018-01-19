'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (err, req, res, next) {
    var _err$status = err.status,
        status = _err$status === undefined ? 500 : _err$status,
        _err$message = err.message,
        message = _err$message === undefined ? 'server error' : _err$message;

    return res.status(status).json({ success: false,
        message: message,
        status: status
    });
};
//# sourceMappingURL=errorHandler.js.map