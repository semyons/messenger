'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrentUser = undefined;

var getCurrentUser = exports.getCurrentUser = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
        var token, user, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        token = req.token;
                        _context.prev = 1;
                        _context.next = 4;
                        return UserService.getUserByToken(token);

                    case 4:
                        user = _context.sent;
                        _context.next = 11;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](1);
                        message = _context.t0.message;
                        return _context.abrupt('return', next({
                            status: 500,
                            message: message
                        }));

                    case 11:
                        return _context.abrupt('return', res.json(user));

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 7]]);
    }));

    return function getCurrentUser(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var _UserService = require('../services/UserService');

var UserService = _interopRequireWildcard(_UserService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 31.03.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
//# sourceMappingURL=user.js.map