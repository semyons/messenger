'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deletemessage = exports.getuserbylogin = exports.getuserinfo = exports.getuser = exports.getmessages = exports.getdialogs = exports.createdialog = undefined;

var _Dialogs = require('../models/Dialogs');

var _Dialogs2 = _interopRequireDefault(_Dialogs);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _Messages = require('../models/Messages');

var _Messages2 = _interopRequireDefault(_Messages);

var _parseJsonResponse = require('parse-json-response');

var _parseJsonResponse2 = _interopRequireDefault(_parseJsonResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 24.07.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var https = require('https');

var createdialog = exports.createdialog = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res, next) {
        var credentials;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        credentials = {
                            secondguy: req.body.secondguy
                        };

                        try {
                            _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(err, userx) {
                                    var newdialog, Dialog;
                                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    if (userx) {
                                                        newdialog = void 0;
                                                        Dialog = _Dialogs2.default.findOne({
                                                            $or: [{ firstguy: userx.login, secondguy: credentials.secondguy }, { firstguy: credentials.secondguy, secondguy: userx.login }]
                                                        }, function () {
                                                            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(err, docs) {
                                                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                                    while (1) {
                                                                        switch (_context2.prev = _context2.next) {
                                                                            case 0:

                                                                                if (!docs) {
                                                                                    _Dialogs2.default.findOne({ login: credentials.secondguy }, function () {
                                                                                        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, usery) {
                                                                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                                                                while (1) {
                                                                                                    switch (_context.prev = _context.next) {
                                                                                                        case 0:
                                                                                                            if (usery) {
                                                                                                                _context.next = 13;
                                                                                                                break;
                                                                                                            }

                                                                                                            _context.prev = 1;
                                                                                                            _context.next = 4;
                                                                                                            return _Dialogs2.default.create({
                                                                                                                firstguy: userx.login,
                                                                                                                secondguy: credentials.secondguy
                                                                                                            });

                                                                                                        case 4:
                                                                                                            newdialog = _context.sent;
                                                                                                            _context.next = 10;
                                                                                                            break;

                                                                                                        case 7:
                                                                                                            _context.prev = 7;
                                                                                                            _context.t0 = _context['catch'](1);

                                                                                                            res.json({
                                                                                                                success: false,
                                                                                                                status: 400,
                                                                                                                message: 'bad credentials'
                                                                                                            });

                                                                                                        case 10:
                                                                                                            res.json({
                                                                                                                success: true,
                                                                                                                firstguy: newdialog.firstguy,
                                                                                                                secondguy: newdialog.secondguy,
                                                                                                                id: newdialog.id,
                                                                                                                update: newdialog.updated,
                                                                                                                lastmessage: newdialog.lastmessage
                                                                                                            });
                                                                                                            _context.next = 14;
                                                                                                            break;

                                                                                                        case 13:
                                                                                                            res.json({
                                                                                                                success: false,
                                                                                                                message: 'Cant find user ' + credentials.secondguy
                                                                                                            });

                                                                                                        case 14:
                                                                                                        case 'end':
                                                                                                            return _context.stop();
                                                                                                    }
                                                                                                }
                                                                                            }, _callee, this, [[1, 7]]);
                                                                                        }));

                                                                                        return function (_x8, _x9) {
                                                                                            return _ref4.apply(this, arguments);
                                                                                        };
                                                                                    }());
                                                                                } else {
                                                                                    res.json({
                                                                                        success: false,
                                                                                        message: 'Dialog already exist.',
                                                                                        dialogid: docs.id
                                                                                    });
                                                                                }

                                                                            case 1:
                                                                            case 'end':
                                                                                return _context2.stop();
                                                                        }
                                                                    }
                                                                }, _callee2, this);
                                                            }));

                                                            return function (_x6, _x7) {
                                                                return _ref3.apply(this, arguments);
                                                            };
                                                        }());
                                                    } else {
                                                        res.json({
                                                            success: false,
                                                            status: 400,
                                                            message: 'Cant find user with this token. Check your token'
                                                        });
                                                    }

                                                case 1:
                                                case 'end':
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee3, this);
                                }));

                                return function (_x4, _x5) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());
                        } catch (err) {
                            res.json({
                                success: false,
                                status: 400,
                                message: 'Something goes bad(semyon ne vinovat(ni v chem))'
                            });
                        }

                    case 2:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function createdialog(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
var getdialogs = exports.getdialogs = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(req, res, next) {
        var limit, skip;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        limit = Number.parseInt(req.body.limit);
                        skip = Number.parseInt(req.body.skip);


                        try {
                            _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function () {
                                var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(err, userx) {
                                    var person;
                                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                        while (1) {
                                            switch (_context7.prev = _context7.next) {
                                                case 0:
                                                    if (userx) {
                                                        person = userx.login;

                                                        console.log(person + '-LOLOLOLOLOLOLOOLLO');
                                                        _Dialogs2.default.find({ $or: [{ firstguy: person }, { secondguy: person }] }, ['firstguy', 'lastmessage', 'secondguy', 'id', 'updated'], { skip: skip, limit: limit, sort: { updated: -1 } }, function () {
                                                            var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(err, docs) {
                                                                var finalresponse, _loop, i, checkcicle;

                                                                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                                                    while (1) {
                                                                        switch (_context6.prev = _context6.next) {
                                                                            case 0:
                                                                                console.log(docs);
                                                                                if (!docs.length) {
                                                                                    res.json({
                                                                                        success: false,
                                                                                        message: 'you dont have dialogs yet'
                                                                                    });
                                                                                } else {
                                                                                    finalresponse = {
                                                                                        success: true,
                                                                                        dialog_list: []
                                                                                    };

                                                                                    _loop = function _loop(i) {
                                                                                        if (i === 0) {
                                                                                            checkcicle = 1;
                                                                                        }

                                                                                        if (docs[i].firstguy === person) {
                                                                                            _user2.default.findOne({ login: docs[i].secondguy }, function () {
                                                                                                var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(err, userok) {
                                                                                                    var obj, currrent;
                                                                                                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                                                                                        while (1) {
                                                                                                            switch (_context5.prev = _context5.next) {
                                                                                                                case 0:

                                                                                                                    if (userok) {
                                                                                                                        if (userok.firstname && userok.lastname) {
                                                                                                                            obj = {
                                                                                                                                reciver: docs[i].secondguy,
                                                                                                                                dialogid: docs[i]._id,
                                                                                                                                lastmessage: docs[i].lastmessage,
                                                                                                                                updated: docs[i].updated,
                                                                                                                                name: userok.firstname + ' ' + userok.lastname,
                                                                                                                                avatar: userok.avatar,
                                                                                                                                idvk: userok.idvk,
                                                                                                                                idfb: userok.idfb,
                                                                                                                                idinsta: userok.idinsta,
                                                                                                                                idok: userok.idok
                                                                                                                            };
                                                                                                                        } else {
                                                                                                                            obj = {
                                                                                                                                reciver: docs[i].secondguy,
                                                                                                                                dialogid: docs[i]._id,
                                                                                                                                lastmessage: docs[i].lastmessage,
                                                                                                                                updated: docs[i].updated,
                                                                                                                                name: docs[i].secondguy,
                                                                                                                                avatar: userok.avatar,
                                                                                                                                idvk: userok.idvk,
                                                                                                                                idfb: userok.idfb,
                                                                                                                                idinsta: userok.idinsta,
                                                                                                                                idok: userok.idok
                                                                                                                            };
                                                                                                                        }
                                                                                                                        finalresponse.dialog_list.push(obj);
                                                                                                                        currrent = i + 1;

                                                                                                                        console.log('odin proshel_' + currrent);
                                                                                                                        if (parseInt(checkcicle) === parseInt(docs.length)) {
                                                                                                                            console.log('uehal iz 1');
                                                                                                                            res.json(finalresponse);
                                                                                                                        }
                                                                                                                        checkcicle++;
                                                                                                                        console.log(checkcicle + 'rolf');
                                                                                                                    } else {
                                                                                                                        checkcicle++;
                                                                                                                    }
                                                                                                                    // else{
                                                                                                                    //     res.json({
                                                                                                                    //         success:false,
                                                                                                                    //         message:'cant find user with this login'
                                                                                                                    //     });
                                                                                                                    // }

                                                                                                                case 1:
                                                                                                                case 'end':
                                                                                                                    return _context5.stop();
                                                                                                            }
                                                                                                        }
                                                                                                    }, _callee5, this);
                                                                                                }));

                                                                                                return function (_x17, _x18) {
                                                                                                    return _ref8.apply(this, arguments);
                                                                                                };
                                                                                            }());
                                                                                        } else {
                                                                                            _user2.default.findOne({ login: docs[i].firstguy }, function (err, userok) {
                                                                                                if (userok) {
                                                                                                    if (userok.firstname && userok.lastname) {
                                                                                                        var obj = {
                                                                                                            reciver: docs[i].firstguy,
                                                                                                            dialogid: docs[i]._id,
                                                                                                            lastmessage: docs[i].lastmessage,
                                                                                                            updated: docs[i].updated,
                                                                                                            name: userok.firstname + ' ' + userok.lastname,
                                                                                                            avatar: userok.avatar,
                                                                                                            idvk: userok.idvk,
                                                                                                            idfb: userok.idfb,
                                                                                                            idinsta: userok.idinsta,
                                                                                                            idok: userok.idok
                                                                                                        };
                                                                                                    } else {
                                                                                                        var obj = {
                                                                                                            reciver: docs[i].firstguy,
                                                                                                            dialogid: docs[i]._id,
                                                                                                            lastmessage: docs[i].lastmessage,
                                                                                                            updated: docs[i].updated,
                                                                                                            name: docs[i].firstguy,
                                                                                                            avatar: userok.avatar,
                                                                                                            idvk: userok.idvk,
                                                                                                            idfb: userok.idfb,
                                                                                                            idinsta: userok.idinsta,
                                                                                                            idok: userok.idok
                                                                                                        };
                                                                                                    }
                                                                                                    finalresponse.dialog_list.push(obj);
                                                                                                    var currrent = i + 1;
                                                                                                    console.log('odin proshel_' + currrent);
                                                                                                    if (parseInt(checkcicle) === parseInt(docs.length)) {
                                                                                                        res.json(finalresponse);
                                                                                                        console.log('uehal iz 2');
                                                                                                    }
                                                                                                    checkcicle++;
                                                                                                } else {
                                                                                                    checkcicle++;
                                                                                                }
                                                                                                //     else{
                                                                                                //     res.json({
                                                                                                //         success:false,
                                                                                                //         message:'cant find user with this login'
                                                                                                //     });
                                                                                                // }
                                                                                            });
                                                                                        }
                                                                                    };

                                                                                    for (i = 0; i < docs.length; i++) {
                                                                                        _loop(i);
                                                                                    }
                                                                                }

                                                                            case 2:
                                                                            case 'end':
                                                                                return _context6.stop();
                                                                        }
                                                                    }
                                                                }, _callee6, this);
                                                            }));

                                                            return function (_x15, _x16) {
                                                                return _ref7.apply(this, arguments);
                                                            };
                                                        }());
                                                    } else {
                                                        res.json({
                                                            success: false,
                                                            status: 400,
                                                            message: 'Cant find user with this token. Check your token'
                                                        });
                                                    }

                                                case 1:
                                                case 'end':
                                                    return _context7.stop();
                                            }
                                        }
                                    }, _callee7, this);
                                }));

                                return function (_x13, _x14) {
                                    return _ref6.apply(this, arguments);
                                };
                            }());
                        } catch (err) {}

                    case 3:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function getdialogs(_x10, _x11, _x12) {
        return _ref5.apply(this, arguments);
    };
}();
var getmessages = exports.getmessages = function () {
    var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(req, res, next) {
        var limit, skip;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        limit = Number.parseInt(req.body.limit);
                        skip = Number.parseInt(req.body.skip);

                        console.log(req.body.dialogid);
                        _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function (err, docx) {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: 'some error while finding user by token'
                                });
                            } else {
                                if (docx) {
                                    _Messages2.default.find({ dialogid: req.body.dialogid }, ['date', 'message', 'sender', 'reciver', 'dialogid', 'timestamp'], { skip: skip, limit: limit, sort: { date: 1 } }, function (err, docs) {
                                        if (!docs.length) {
                                            res.json({
                                                success: false,
                                                message: 'you dont have messages yet'
                                            });
                                        } else {
                                            var response = {
                                                success: true,
                                                message_list: []
                                            };
                                            Array.prototype.push.apply(response.message_list, docs);
                                            res.json(response);
                                        }
                                    });
                                } else {
                                    var response = {
                                        success: true,
                                        message_list: []
                                    };
                                    res.json(response);
                                }
                            }
                        });

                    case 4:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function getmessages(_x19, _x20, _x21) {
        return _ref9.apply(this, arguments);
    };
}();
var getuser = exports.getuser = function () {
    var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(req, res, next) {
        var response, registered, unregistered, gsonlist, checker;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        response = {
                            success: true,
                            user_list: []
                        };

                        if (req.body.list) {
                            (function () {
                                var compareAge = function compareAge(a, b) {
                                    var c = a.name.toUpperCase(),
                                        d = b.name.toUpperCase();

                                    if (c < d) {
                                        return -1;
                                    } else if (c > d) {
                                        return 1;
                                    }

                                    return 0;
                                };

                                registered = [];
                                unregistered = [];
                                gsonlist = req.body.list;

                                gsonlist = JSON.parse(gsonlist);
                                console.log(gsonlist);
                                ;

                                var _loop2 = function _loop2(i) {

                                    gsonlist[i].phone = parseInt(gsonlist[i].phone.replace(/\D+/g, "")).toString(10);
                                    if (gsonlist[i].phone[0] == '8') {
                                        gsonlist[i].phone = gsonlist[i].phone.slice(1, gsonlist[i].phone.length);
                                        gsonlist[i].phone = '7' + gsonlist[i].phone;
                                    }
                                    if (i === 0) {
                                        checker = 1;
                                    }
                                    _user2.default.findOne({ login: gsonlist[i].phone }, function (err, docs) {

                                        if (docs) {
                                            var variable = {
                                                phone: gsonlist[i].phone,
                                                avatar: docs.avatar,
                                                name: gsonlist[i].name,
                                                id: docs.login,
                                                isRegistered: true
                                            };
                                            registered.push(variable);
                                            if (parseInt(checker) === parseInt(gsonlist.length)) {
                                                response.user_list = response.user_list.concat(registered.sort(compareAge));
                                                response.user_list = response.user_list.concat(unregistered.sort(compareAge));
                                                res.json(response);
                                            } else {
                                                checker++;
                                            }
                                        } else {
                                            var _variable = {
                                                phone: gsonlist[i].phone,
                                                avatar: gsonlist[i].avatar,
                                                name: gsonlist[i].name,
                                                isRegistered: false
                                            };
                                            unregistered.push(_variable);
                                            if (parseInt(checker) === parseInt(gsonlist.length)) {
                                                response.user_list = response.user_list.concat(registered.sort(compareAge));
                                                response.user_list = response.user_list.concat(unregistered.sort(compareAge));
                                                res.json(response);
                                            } else {
                                                checker++;
                                            }
                                        }
                                    });
                                };

                                for (var i = 0; i < gsonlist.length; i++) {
                                    _loop2(i);
                                }
                            })();
                        } else {
                            res.json(response);
                        }

                    case 2:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, undefined);
    }));

    return function getuser(_x22, _x23, _x24) {
        return _ref10.apply(this, arguments);
    };
}();

var getuserinfo = exports.getuserinfo = function () {
    var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(req, res, next) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        _user2.default.findOne({ ourtoken: req.headers.ourtoken }, function (err, docs) {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: 'some error with request'
                                });
                            } else {
                                if (docs) {
                                    res.json({
                                        success: true,
                                        login: docs.login,
                                        email: docs.email,
                                        firstname: docs.firstname,
                                        lastname: docs.lastname,
                                        avatar: docs.avatar,
                                        idvk: docs.idvk,
                                        idfb: docs.idfb,
                                        idinsta: docs.idinsta,
                                        idok: docs.idok,
                                        online: docs.online,
                                        lastvisit: docs.lastvisit
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        message: 'cant find user with this token'
                                    });
                                }
                            }
                        });

                    case 1:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, undefined);
    }));

    return function getuserinfo(_x25, _x26, _x27) {
        return _ref11.apply(this, arguments);
    };
}();
var getuserbylogin = exports.getuserbylogin = function () {
    var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(req, res, next) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _user2.default.findOne({ login: req.body.login }, function (err, docs) {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: 'some error with request'
                                });
                            } else {
                                if (docs) {
                                    res.json({
                                        success: true,
                                        login: docs.login,
                                        email: docs.email,
                                        firstname: docs.firstname,
                                        lastname: docs.lastname,
                                        avatar: docs.avatar,
                                        idvk: docs.idvk,
                                        idfb: docs.idfb,
                                        idinsta: docs.idinsta,
                                        idok: docs.idok,
                                        online: docs.online,
                                        lastvisit: docs.lastvisit
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        message: 'cant find user with this login'
                                    });
                                }
                            }
                        });

                    case 1:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, undefined);
    }));

    return function getuserbylogin(_x28, _x29, _x30) {
        return _ref12.apply(this, arguments);
    };
}();
var deletemessage = exports.deletemessage = function () {
    var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(req, res, next) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        _Messages2.default.findByIdAndRemove(req.body.id, function (err, todo) {
                            // We'll create a simple object to send back with a message and the id of the document that was removed
                            // You can really do this however you want, though.
                            var response = {
                                message: "Todo successfully deleted",
                                id: todo._id
                            };
                            res.send(response);
                        });

                    case 1:
                    case 'end':
                        return _context13.stop();
                }
            }
        }, _callee13, undefined);
    }));

    return function deletemessage(_x31, _x32, _x33) {
        return _ref13.apply(this, arguments);
    };
}();
//# sourceMappingURL=dialogs.js.map