'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _page = require('../models/page');

var _page2 = _interopRequireDefault(_page);

var _Comments = require('../models/Comments');

var _Comments2 = _interopRequireDefault(_Comments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();


var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

var upload = (0, _multer2.default)({ storage: storage });

router.post('/setavatar', upload.single('avatar'), function (req, res) {
    _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function (err, data) {
        if (data) {
            if (req.file) {
                data.avatar = req.file.filename;
                data.save();
                _page2.default.find({ creator: data.login }, function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, datax) {
                        var i;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        for (i = 0; i < datax.length; i++) {
                                            datax[i].creatorava = req.file.filename;
                                            datax[i].save();
                                        }

                                    case 1:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, this);
                    }));

                    return function (_x, _x2) {
                        return _ref.apply(this, arguments);
                    };
                }());
                _Comments2.default.find({ creator: data.login }, function () {
                    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(err, datay) {
                        var i;
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        for (i = 0; i < datax.length; i++) {
                                            datay[i].avatar = req.file.filename;
                                            datay[i].save();
                                        }

                                    case 1:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, _callee2, this);
                    }));

                    return function (_x3, _x4) {
                        return _ref2.apply(this, arguments);
                    };
                }());
                res.json({
                    success: true,
                    filepath: req.file.filename
                });
            } else {
                res.json({
                    success: false,
                    message: 'file isnt uploaded'
                });
            }
        } else {
            res.json({
                success: false,
                message: 'cant find user with this token'
            });
        }
    });
});
router.post('/setname', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(err, data) {
                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                        switch (_context5.prev = _context5.next) {
                                            case 0:
                                                if (data && req.body.firstname && req.body.lastname) {
                                                    data.firstname = req.body.firstname;
                                                    data.lastname = req.body.lastname;
                                                    data.save();
                                                    _page2.default.find({ creator: data.login }, function () {
                                                        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(err, datax) {
                                                            var i;
                                                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                                while (1) {
                                                                    switch (_context3.prev = _context3.next) {
                                                                        case 0:
                                                                            for (i = 0; i < datax.length; i++) {
                                                                                datax[i].creatorname = req.body.firstname + ' ' + req.body.lastname;
                                                                                datax[i].save();
                                                                            }

                                                                        case 1:
                                                                        case 'end':
                                                                            return _context3.stop();
                                                                    }
                                                                }
                                                            }, _callee3, this);
                                                        }));

                                                        return function (_x9, _x10) {
                                                            return _ref5.apply(this, arguments);
                                                        };
                                                    }());
                                                    _Comments2.default.find({ creator: data.login }, function () {
                                                        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(err, datay) {
                                                            var i;
                                                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                                while (1) {
                                                                    switch (_context4.prev = _context4.next) {
                                                                        case 0:
                                                                            for (i = 0; i < datay.length; i++) {
                                                                                datay[i].name = req.body.firstname + ' ' + req.body.lastname;
                                                                                datay[i].save();
                                                                            }

                                                                        case 1:
                                                                        case 'end':
                                                                            return _context4.stop();
                                                                    }
                                                                }
                                                            }, _callee4, this);
                                                        }));

                                                        return function (_x11, _x12) {
                                                            return _ref6.apply(this, arguments);
                                                        };
                                                    }());
                                                    res.json({
                                                        success: true,
                                                        message: 'new data was added'
                                                    });
                                                } else {
                                                    res.json({
                                                        success: false,
                                                        message: 'u dont send first or secondname, or we cant find user by token'

                                                    });
                                                }

                                            case 1:
                                            case 'end':
                                                return _context5.stop();
                                        }
                                    }
                                }, _callee5, this);
                            }));

                            return function (_x7, _x8) {
                                return _ref4.apply(this, arguments);
                            };
                        }());

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());
router.post('/uploadimage', upload.single('image'), function (req, res) {
    _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function (err, data) {
        if (data) {
            if (req.file) {
                res.json({
                    success: true,
                    filepath: req.file.filename
                });
            } else {
                res.json({
                    success: false,
                    message: 'file isnt uploaded'
                });
            }
        } else {
            res.json({
                success: false,
                message: 'cant find user with this token'
            });
        }
    });
});
exports.default = router;
/**
 * Created by Anatola on 06.08.2017.
 */
//# sourceMappingURL=settings.js.map