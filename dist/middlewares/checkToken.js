'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 31.03.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
        var token, tokenObj, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = req.headers['authorization'];

                        if (token) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return', next({
                            status: 403,
                            message: 'Forbidden.No token!'
                        }));

                    case 3:
                        _context.prev = 3;
                        tokenObj = _jsonwebtoken2.default.verify(token, _config2.default.secret);
                        _context.next = 11;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](3);
                        message = _context.t0.message;
                        return _context.abrupt('return', next({
                            status: 400,
                            message: message
                        }));

                    case 11:
                        req.token = tokenObj;
                        next();

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[3, 7]]);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=checkToken.js.map