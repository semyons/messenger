'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getcomments = exports.removecomment = exports.addcomment = exports.addlike = exports.getcurrent = exports.getAllUser = exports.createUser = undefined;

var createUser = exports.createUser = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
        var credentials;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        credentials = {
                            body: req.body.pagebody,
                            title: req.body.title,
                            url: req.body.url,
                            type: 'user'

                        };

                        _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, data) {
                                var page, message;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                if (!data) {
                                                    _context.next = 16;
                                                    break;
                                                }

                                                credentials.creator = data.login;
                                                credentials.creatorava = data.avatar;
                                                _context.prev = 3;
                                                _context.next = 6;
                                                return _page2.default.create(credentials);

                                            case 6:
                                                page = _context.sent;
                                                _context.next = 13;
                                                break;

                                            case 9:
                                                _context.prev = 9;
                                                _context.t0 = _context['catch'](3);
                                                message = _context.t0.message;
                                                return _context.abrupt('return', next({
                                                    status: 400,
                                                    message: message
                                                }));

                                            case 13:
                                                res.json({
                                                    success: true,
                                                    message: 'page was created'
                                                });
                                                _context.next = 17;
                                                break;

                                            case 16:
                                                res.json({
                                                    success: false,
                                                    message: 'your token is wrong'
                                                });

                                            case 17:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, this, [[3, 9]]);
                            }));

                            return function (_x4, _x5) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function createUser(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var getAllUser = exports.getAllUser = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res, next) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(err, data) {
                                var skip, limit, finalresponse, message;
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                skip = req.body.skip;
                                                limit = req.body.limit;

                                                if (!data) {
                                                    _context3.next = 17;
                                                    break;
                                                }

                                                finalresponse = {
                                                    success: true,
                                                    news_list: []
                                                };
                                                _context3.prev = 4;
                                                _context3.next = 7;
                                                return _page2.default.find({ type: 'user' }, ['title', 'url', 'body', 'createdAt', 'creator', 'creatorava', 'like', 'commentcount'], { skip: skip, limit: limit, sort: { createdAt: -1 } });

                                            case 7:
                                                finalresponse.news_list = _context3.sent;
                                                _context3.next = 14;
                                                break;

                                            case 10:
                                                _context3.prev = 10;
                                                _context3.t0 = _context3['catch'](4);
                                                message = _context3.t0.message;
                                                return _context3.abrupt('return', next({
                                                    status: 500,
                                                    message: message
                                                }));

                                            case 14:
                                                res.json(finalresponse);
                                                _context3.next = 18;
                                                break;

                                            case 17:
                                                res.json({
                                                    success: false,
                                                    message: 'your token is wrong'
                                                });

                                            case 18:
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
                    case 1:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function getAllUser(_x6, _x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var getcurrent = exports.getcurrent = function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res, next) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                            var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(err, data) {
                                var skip, limit, finalresponse, message;
                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                        switch (_context5.prev = _context5.next) {
                                            case 0:
                                                skip = req.body.skip;
                                                limit = req.body.limit;

                                                if (!data) {
                                                    _context5.next = 17;
                                                    break;
                                                }

                                                finalresponse = {
                                                    success: true,
                                                    news_list: []
                                                };
                                                _context5.prev = 4;
                                                _context5.next = 7;
                                                return _page2.default.find({ creator: req.body.creator }, ['title', 'url', 'body', 'createdAt', 'creator', 'creatorava', 'like', 'commentcount'], { skip: skip, limit: limit, sort: { createdAt: -1 } });

                                            case 7:
                                                finalresponse.news_list = _context5.sent;
                                                _context5.next = 14;
                                                break;

                                            case 10:
                                                _context5.prev = 10;
                                                _context5.t0 = _context5['catch'](4);
                                                message = _context5.t0.message;
                                                return _context5.abrupt('return', next({
                                                    status: 500,
                                                    message: message
                                                }));

                                            case 14:
                                                res.json(finalresponse);
                                                _context5.next = 18;
                                                break;

                                            case 17:
                                                res.json({
                                                    success: false,
                                                    message: 'your token is wrong'
                                                });

                                            case 18:
                                            case 'end':
                                                return _context5.stop();
                                        }
                                    }
                                }, _callee5, this, [[4, 10]]);
                            }));

                            return function (_x14, _x15) {
                                return _ref8.apply(this, arguments);
                            };
                        }());

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function getcurrent(_x11, _x12, _x13) {
        return _ref7.apply(this, arguments);
    };
}();

var addlike = exports.addlike = function () {
    var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(req, res, next) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                            var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(err, data) {
                                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                    while (1) {
                                        switch (_context8.prev = _context8.next) {
                                            case 0:
                                                if (data) {
                                                    _page2.default.findOne({ _id: req.body.id }, function () {
                                                        var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(err, datanews) {
                                                            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                                                while (1) {
                                                                    switch (_context7.prev = _context7.next) {
                                                                        case 0:
                                                                            if (datanews) {
                                                                                if (datanews.like.indexOf(data.login) != -1) {
                                                                                    datanews.like.splice(datanews.like.indexOf(data.login), 1);
                                                                                    datanews.save();
                                                                                    res.json({
                                                                                        success: true,
                                                                                        islike: false,
                                                                                        likescount: datanews.like.length,
                                                                                        likers: datanews.like
                                                                                    });
                                                                                } else {
                                                                                    datanews.like.push(data.login);
                                                                                    datanews.save();
                                                                                    res.json({
                                                                                        success: true,
                                                                                        islike: true,
                                                                                        likescount: datanews.like.length,
                                                                                        likers: datanews.like
                                                                                    });
                                                                                }
                                                                            } else {
                                                                                res.json({
                                                                                    success: false,
                                                                                    message: 'cant find news by id'
                                                                                });
                                                                            }

                                                                        case 1:
                                                                        case 'end':
                                                                            return _context7.stop();
                                                                    }
                                                                }
                                                            }, _callee7, this);
                                                        }));

                                                        return function (_x21, _x22) {
                                                            return _ref12.apply(this, arguments);
                                                        };
                                                    }());
                                                } else {
                                                    res.json({
                                                        success: false,
                                                        message: 'cant find user by token'
                                                    });
                                                }

                                            case 1:
                                            case 'end':
                                                return _context8.stop();
                                        }
                                    }
                                }, _callee8, this);
                            }));

                            return function (_x19, _x20) {
                                return _ref11.apply(this, arguments);
                            };
                        }());

                    case 1:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));

    return function addlike(_x16, _x17, _x18) {
        return _ref10.apply(this, arguments);
    };
}();

var addcomment = exports.addcomment = function () {
    var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(req, res, next) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                            var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(err, data) {
                                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                                    while (1) {
                                        switch (_context11.prev = _context11.next) {
                                            case 0:
                                                if (data) {
                                                    _page2.default.findOne({ _id: req.body.id }, function () {
                                                        var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(err, datanews) {
                                                            var credentials;
                                                            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                                                                while (1) {
                                                                    switch (_context10.prev = _context10.next) {
                                                                        case 0:
                                                                            if (!datanews) {
                                                                                _context10.next = 10;
                                                                                break;
                                                                            }

                                                                            credentials = {
                                                                                creator: data.login,
                                                                                date: Date.now(),
                                                                                name: data.firstname + ' ' + data.lastname,
                                                                                avatar: data.avatar,
                                                                                message: req.body.message,
                                                                                newsid: req.body.id
                                                                            };
                                                                            _context10.next = 4;
                                                                            return _Comments2.default.create(credentials);

                                                                        case 4:
                                                                            console.log(credentials);
                                                                            datanews.commentcount++;
                                                                            datanews.save();
                                                                            res.json({
                                                                                success: true,
                                                                                message: 'comment created'

                                                                            });
                                                                            _context10.next = 11;
                                                                            break;

                                                                        case 10:
                                                                            res.json({
                                                                                success: false,
                                                                                message: 'cant find news by id'
                                                                            });

                                                                        case 11:
                                                                        case 'end':
                                                                            return _context10.stop();
                                                                    }
                                                                }
                                                            }, _callee10, this);
                                                        }));

                                                        return function (_x28, _x29) {
                                                            return _ref15.apply(this, arguments);
                                                        };
                                                    }());
                                                } else {
                                                    res.json({
                                                        success: false,
                                                        message: 'cant find user by token'
                                                    });
                                                }

                                            case 1:
                                            case 'end':
                                                return _context11.stop();
                                        }
                                    }
                                }, _callee11, this);
                            }));

                            return function (_x26, _x27) {
                                return _ref14.apply(this, arguments);
                            };
                        }());

                    case 1:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, this);
    }));

    return function addcomment(_x23, _x24, _x25) {
        return _ref13.apply(this, arguments);
    };
}();

var removecomment = exports.removecomment = function () {
    var _ref16 = _asyncToGenerator(regeneratorRuntime.mark(function _callee15(req, res, next) {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                            var _ref17 = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(err, data) {
                                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                                    while (1) {
                                        switch (_context14.prev = _context14.next) {
                                            case 0:
                                                if (data) {
                                                    _Comments2.default.findOne({ _id: req.body.commentid }, function () {
                                                        var _ref18 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(err, datacomment) {
                                                            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                                                                while (1) {
                                                                    switch (_context13.prev = _context13.next) {
                                                                        case 0:
                                                                            if (data) {
                                                                                if (datacomment.creator === data.login) {
                                                                                    datacomment.remove();
                                                                                    res.json({
                                                                                        success: true,
                                                                                        commentid: req.body.commentid + ' was removed'
                                                                                    });
                                                                                } else {
                                                                                    res.json({
                                                                                        success: false,
                                                                                        message: 'You cant remove comments of other users'
                                                                                    });
                                                                                }
                                                                            } else {
                                                                                res.json({
                                                                                    success: false,
                                                                                    message: 'cant find comment with this id'
                                                                                });
                                                                            }

                                                                        case 1:
                                                                        case 'end':
                                                                            return _context13.stop();
                                                                    }
                                                                }
                                                            }, _callee13, this);
                                                        }));

                                                        return function (_x35, _x36) {
                                                            return _ref18.apply(this, arguments);
                                                        };
                                                    }());
                                                } else {
                                                    res.json({
                                                        success: false,
                                                        message: 'cant find user by token'
                                                    });
                                                }

                                            case 1:
                                            case 'end':
                                                return _context14.stop();
                                        }
                                    }
                                }, _callee14, this);
                            }));

                            return function (_x33, _x34) {
                                return _ref17.apply(this, arguments);
                            };
                        }());

                    case 1:
                    case 'end':
                        return _context15.stop();
                }
            }
        }, _callee15, this);
    }));

    return function removecomment(_x30, _x31, _x32) {
        return _ref16.apply(this, arguments);
    };
}();

var getcomments = exports.getcomments = function () {
    var _ref19 = _asyncToGenerator(regeneratorRuntime.mark(function _callee17(req, res, next) {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                            var _ref20 = _asyncToGenerator(regeneratorRuntime.mark(function _callee16(err, data) {
                                var response;
                                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                                    while (1) {
                                        switch (_context16.prev = _context16.next) {
                                            case 0:
                                                if (!data) {
                                                    _context16.next = 9;
                                                    break;
                                                }

                                                response = {
                                                    success: true,
                                                    comment_list: []
                                                };
                                                _context16.next = 4;
                                                return _Comments2.default.find({ newsid: req.body.newsid }, [], { skip: req.body.skip, limit: req.body.limit, sort: { date: -1 } });

                                            case 4:
                                                response.comment_list = _context16.sent;

                                                console.log(response.comment_list);
                                                res.json(response);
                                                _context16.next = 10;
                                                break;

                                            case 9:
                                                res.json({
                                                    success: false,
                                                    message: 'cant find user by token'
                                                });

                                            case 10:
                                            case 'end':
                                                return _context16.stop();
                                        }
                                    }
                                }, _callee16, this);
                            }));

                            return function (_x40, _x41) {
                                return _ref20.apply(this, arguments);
                            };
                        }());

                    case 1:
                    case 'end':
                        return _context17.stop();
                }
            }
        }, _callee17, this);
    }));

    return function getcomments(_x37, _x38, _x39) {
        return _ref19.apply(this, arguments);
    };
}();

var _page = require('../models/page');

var _page2 = _interopRequireDefault(_page);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _Comments = require('../models/Comments');

var _Comments2 = _interopRequireDefault(_Comments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 31.03.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
//# sourceMappingURL=page.js.map