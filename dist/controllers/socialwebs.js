'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addsocialweb = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 28.07.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var addsocialweb = exports.addsocialweb = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        try {
                            _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, user) {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (user) {
                                                        console.log(user);
                                                        if (req.body.idvk) {
                                                            user.idvk = req.body.idvk;
                                                        }
                                                        if (req.body.idok) {
                                                            user.idok = req.body.idok;
                                                        }
                                                        if (req.body.idfb) {
                                                            user.idfb = req.body.idfb;
                                                        }
                                                        if (req.body.idinsta) {
                                                            user.idinsta = req.body.idinsta;
                                                        }
                                                        user.save();
                                                        res.json(user);
                                                    } else {
                                                        res.json({
                                                            success: false,
                                                            status: 400,
                                                            message: 'Cant find user with this token. Check your token'
                                                        });
                                                    }

                                                case 1:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                }));

                                return function (_x4, _x5) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());
                        } catch (err) {
                            res.json({
                                success: false,
                                message: 'some error while adding social web'
                            });
                        }

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function addsocialweb(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=socialwebs.js.map