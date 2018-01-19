'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 31.03.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var randomstring = require("randomstring");
var SMSru = require('sms_ru');
var sms = new SMSru('AA0C7A43-90D1-284B-C28E-CD6C22088350');
var router = _express2.default.Router();
router.post('/smssend', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var login, code;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        login = req.body.login;
                        _context2.next = 3;
                        return randomstring.generate({
                            length: 5,
                            charset: 'numeric'
                        });

                    case 3:
                        code = _context2.sent;

                        _user2.default.findOne({ login: login }, function () {
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, userx) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                if (err) {
                                                    res.json('User not found');
                                                } else {
                                                    sms.sms_send({
                                                        to: login,
                                                        text: code
                                                    }, function (e) {
                                                        console.log(e.description);
                                                    });
                                                    if (userx.smscount !== null) {
                                                        if (userx.smscount < 15) {
                                                            userx.smscount++;
                                                            userx.checkcode = code;
                                                            console.log(code);
                                                            userx.save();
                                                            res.json({
                                                                success: true,
                                                                status: 200,
                                                                message: 'sms was successfully sended'
                                                            });
                                                        } else {
                                                            res.json({
                                                                success: false,
                                                                status: 400,
                                                                message: 'You exceeded the sms-limit'
                                                            });
                                                        }
                                                    } else {
                                                        userx.checkcode = code;
                                                        console.log(code);
                                                        userx.save();
                                                        res.json({
                                                            success: true,
                                                            status: 200,
                                                            message: 'sms was successfully sended'
                                                        });
                                                    }
                                                }

                                            case 1:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, this);
                            }));

                            return function (_x3, _x4) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());
router.post('/checksms', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
        var login;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        login = req.body.login;

                        _user2.default.findOne({ login: login }, function () {
                            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(err, userx) {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                if (err) {
                                                    res.json({
                                                        success: false,
                                                        status: 400,
                                                        message: 'user not found'
                                                    });
                                                } else {
                                                    if (userx.checkcode === req.body.checkcode) {
                                                        if (req.body.password) {
                                                            userx.password = req.body.password;
                                                            userx.save();
                                                            res.json({
                                                                success: true,
                                                                message: 'password changed'
                                                            });
                                                        } else {
                                                            userx.confirmed = 1;
                                                            userx.save();
                                                            res.json({
                                                                success: true,
                                                                message: 'account was confirmed'
                                                            });
                                                        }
                                                    } else {
                                                        res.json({
                                                            success: false,
                                                            status: 400,
                                                            message: 'wrong checkcode'
                                                        });
                                                    }
                                                }

                                            case 1:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, this);
                            }));

                            return function (_x7, _x8) {
                                return _ref4.apply(this, arguments);
                            };
                        }());

                    case 2:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

/*
 res.json(user);
 }else{
 doc.user('login','12312312');
 User.save();
 res.json(user);}
 });*/

exports.default = router;
//# sourceMappingURL=smsru.js.map