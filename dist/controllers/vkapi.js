'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.vkapiSendMessage = exports.vkapiStartLongPoll = exports.vkapiGetHistory = exports.vkapiGetLongPoll = exports.vkapiget = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _parseJsonResponse = require('parse-json-response');

var _parseJsonResponse2 = _interopRequireDefault(_parseJsonResponse);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 01.05.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var https = require('https');
var vkapiget = exports.vkapiget = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _request2.default.post('https://api.vk.com/method/messages.send?peer_id=63049337&message=Привет&v=5.63');
                        res.json('zaaasd');

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function vkapiget(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var vkapiGetLongPoll = exports.vkapiGetLongPoll = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var clienttokenvk;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        clienttokenvk = '720c6c5e2bff13cee1cb4c1197f2d4b7d7589cba6c920a942c64b58886a1f50e53d18b2c36cf605fddff4';

                        https.get('https://api.vk.com/method/messages.getLongPollServer?access_token=' + clienttokenvk + '&need_pts=1', (0, _parseJsonResponse2.default)(function (er, data) {
                            res.send(data.response);
                        }));

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function vkapiGetLongPoll(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var vkapiGetHistory = exports.vkapiGetHistory = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
        var clienttokenvk, friendidvk;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        clienttokenvk = req.body.vktoken;
                        friendidvk = req.body.friendidvk;

                        https.get('https://api.vk.com/method/messages.getHistory?access_token=' + clienttokenvk + '&user_id=' + friendidvk + '&offset=0&', (0, _parseJsonResponse2.default)(function (er, data) {
                            var kekus = data.response;
                            kekus.forEach(function (el, i, arr) {
                                if (_typeof(arr[i]) != 'object') {
                                    kekus.splice(i, 1);
                                }
                            });
                            res.send(kekus);
                        }));

                    case 3:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function vkapiGetHistory(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var vkapiStartLongPoll = exports.vkapiStartLongPoll = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
        var key, server, ts, pts;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        key = '574e2f4da375b05ae7c43cd5e8246589b4344418';
                        server = 'imv4.vk.com\/im2308';
                        ts = '1832246197';
                        pts = '10193396';


                        res.json('https://' + server + '?act=a_check&key=' + key + '&ts=' + ts + '&wait=25&mode=2&version=2', (0, _parseJsonResponse2.default)(function (er, data) {
                            res.send(data.response);
                            vkapiStartLongPoll();
                        }));

                    case 5:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function vkapiStartLongPoll(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var vkapiSendMessage = exports.vkapiSendMessage = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res, next) {
        var clienttokenvk, friendidvk, message, toconvert;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        clienttokenvk = req.body.vktoken;
                        friendidvk = req.body.friendidvk;
                        message = req.body.message;

                        message = _querystring2.default.escape(message);
                        message = message.toString("utf-8");
                        toconvert = 'https://api.vk.com/method/messages.send?user_id=' + friendidvk + '&message=' + message + '&access_token=' + clienttokenvk;

                        https.get(toconvert.toString("utf-8"));
                        res.json('Message was successfully sended');

                    case 8:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function vkapiSendMessage(_x9, _x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();
//# sourceMappingURL=vkapi.js.map