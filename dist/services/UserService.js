'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserByToken = undefined;

var getUserByToken = exports.getUserByToken = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(token) {
        var usera;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        usera = void 0;
                        _context.prev = 1;
                        _context.next = 4;
                        return _user2.default.findOne({ ourtoken: token });

                    case 4:
                        usera = _context.sent;
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](1);
                        throw _context.t0;

                    case 10:
                        console.log('EBAAAAAT YA TUT');
                        console.log(usera);
                        return _context.abrupt('return', usera);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 7]]);
    }));

    return function getUserByToken(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 31.03.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
//# sourceMappingURL=UserService.js.map