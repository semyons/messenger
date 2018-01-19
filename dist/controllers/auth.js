'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signin = exports.signup = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 30.03.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var signup = exports.signup = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
        var currentthing, credentials, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        currentthing = req.body.login.replace(/\D+/g, "");

                        console.log(currentthing.length);
                        if (currentthing.length === 11) {
                            credentials = {
                                password: req.body.password,
                                login: currentthing,
                                email: req.body.email
                            };
                            user = void 0;

                            _user2.default.findOne({ login: req.body.login }, function () {
                                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, userx) {
                                    var message;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    console.log(userx);

                                                    if (userx) {
                                                        _context.next = 15;
                                                        break;
                                                    }

                                                    _context.prev = 2;
                                                    _context.next = 5;
                                                    return _user2.default.create(credentials);

                                                case 5:
                                                    user = _context.sent;
                                                    _context.next = 12;
                                                    break;

                                                case 8:
                                                    _context.prev = 8;
                                                    _context.t0 = _context['catch'](2);
                                                    message = _context.t0.message;
                                                    return _context.abrupt('return', next({
                                                        success: false,
                                                        status: 400,
                                                        message: message
                                                    }));

                                                case 12:
                                                    res.json({
                                                        success: true,
                                                        login: user.login
                                                    });
                                                    _context.next = 16;
                                                    break;

                                                case 15:
                                                    if (userx.confirmed !== 1) {
                                                        userx.login = credentials.login;
                                                        userx.password = credentials.password;
                                                        userx.email = credentials.email;
                                                        userx.save();
                                                        res.json({
                                                            success: true,
                                                            login: userx.login,
                                                            message: 'user was successfully rewrited'
                                                        });
                                                    } else {
                                                        res.json({
                                                            success: false,
                                                            status: 400,
                                                            message: 'this username was already validated'
                                                        });
                                                    }

                                                case 16:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this, [[2, 8]]);
                                }));

                                return function (_x4, _x5) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());
                        } else {
                            res.json({
                                success: false,
                                message: 'your login should have 11 nums'
                            });
                        }
                    case 3:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function signup(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
var signin = exports.signin = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res, next) {
        var login, password;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        login = req.body.login, password = req.body.password;
                        _context4.next = 3;
                        return _user2.default.findOne({ login: login }, function () {
                            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(err, user) {
                                var result, token;
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                if (user) {
                                                    _context3.next = 4;
                                                    break;
                                                }

                                                return _context3.abrupt('return', res.json({
                                                    success: false,
                                                    status: 400,
                                                    message: 'user not found'
                                                }));

                                            case 4:
                                                _context3.prev = 4;
                                                _context3.next = 7;
                                                return user.comparePasswords(password);

                                            case 7:
                                                result = _context3.sent;
                                                _context3.next = 13;
                                                break;

                                            case 10:
                                                _context3.prev = 10;
                                                _context3.t0 = _context3['catch'](4);
                                                return _context3.abrupt('return', res.json({
                                                    success: false,
                                                    status: 400,
                                                    message: 'Bad Credentials'
                                                }));

                                            case 13:
                                                if (result == false) {
                                                    res.json({
                                                        success: false,
                                                        status: 400,
                                                        message: 'wrong login or password'
                                                    });
                                                } else {
                                                    console.log(user.ourtoken);
                                                    if (user.ourtoken !== '0') {
                                                        res.json({
                                                            success: true,
                                                            login: user.login,
                                                            token: user.ourtoken
                                                        });
                                                    } else {
                                                        token = _jsonwebtoken2.default.sign({ _id: login }, _config2.default.secret);

                                                        user.ourtoken = token;
                                                        console.log(user);
                                                        user.save();
                                                        res.json({
                                                            success: true,
                                                            token: user.ourtoken,
                                                            login: user.login
                                                        });
                                                    }
                                                }

                                            case 14:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, this, [[4, 10]]);
                            }));

                            return function (_x9, _x10) {
                                return _ref5.apply(this, arguments);
                            };
                        }());

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function signin(_x6, _x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();
//# sourceMappingURL=auth.js.map