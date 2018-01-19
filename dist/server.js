'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _unixTimestamp = require('unix-timestamp');

var _unixTimestamp2 = _interopRequireDefault(_unixTimestamp);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _page = require('./routes/page');

var _page2 = _interopRequireDefault(_page);

var _dialogs = require('./routes/dialogs');

var _dialogs2 = _interopRequireDefault(_dialogs);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _checkToken = require('./middlewares/checkToken');

var _checkToken2 = _interopRequireDefault(_checkToken);

var _getUser = require('./middlewares/getUser');

var _getUser2 = _interopRequireDefault(_getUser);

var _UserService = require('./services/UserService');

var UserService = _interopRequireWildcard(_UserService);

var _smsru = require('./routes/smsru');

var _smsru2 = _interopRequireDefault(_smsru);

var _AddSocialWebs = require('./routes/AddSocialWebs');

var _AddSocialWebs2 = _interopRequireDefault(_AddSocialWebs);

var _settings = require('./routes/settings');

var _settings2 = _interopRequireDefault(_settings);

var _Messages = require('./models/Messages');

var _Messages2 = _interopRequireDefault(_Messages);

var _Dialogs = require('./models/Dialogs');

var _Dialogs2 = _interopRequireDefault(_Dialogs);

var _user3 = require('./models/user');

var _user4 = _interopRequireDefault(_user3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 30.03.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


_unixTimestamp2.default.round = true;

var app = (0, _express2.default)(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
_mongoose2.default.Promise = _bluebird2.default;

_mongoose2.default.connect(_config2.default.database, { useMongoClient: true }, function (err) {
    if (err) {
        throw err;
    }
    console.log('MongoConnected');
});
server.listen(3000);
var userxl = {};
var connectedUsers = {};
io.use(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(socket, next) {
        var handshakeData, token, device, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        handshakeData = socket.request;

                        // Если есть токен

                        if (!(handshakeData._query.token !== undefined && connectedUsers[handshakeData._query.token] === undefined)) {
                            _context.next = 17;
                            break;
                        }

                        token = handshakeData._query.token;
                        device = handshakeData._query.device;

                        if (device === undefined) {
                            device = '';
                        }
                        connectedUsers[token] = token;

                        // Мы - обычный пользователь
                        console.log({ 'socket': socket.id, 'token': token, 'device': device });

                        // авторизация пользователя
                        // Пытаемся найти пользователя у себя в базе
                        _context.next = 9;
                        return UserService.getUserByToken(token);

                    case 9:
                        user = _context.sent;

                        socket.handshake.doc = { token: token, user: user, device: device };
                        console.log({ 'find user': user });
                        console.log('-----------------------------------------s----------------------------------');
                        delete connectedUsers[token];
                        next();
                        // delete connectedUsers[token];

                        _context.next = 18;
                        break;

                    case 17:
                        if (connectedUsers[handshakeData._query.token] !== undefined) {
                            console.log({
                                'socket': socket.id,
                                'token': handshakeData._query.token,
                                'device': handshakeData._query.device + ' - canceled'
                            });
                        } else {
                            console.log({ 'socket': socket.id, 'token': 'none', 'device': handshakeData._query.device });
                        }

                    case 18:
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

io.on('connection', function (socket) {
    console.log('added new connection');
    if (socket.handshake.doc.user) {
        if (empty(userxl[socket.handshake.doc.user.login])) {
            // socket.nickname = socket;
            // userxl[socket.nickname] = socket;
            //Добавляем текущего пользователя в ОнЛайн, если его нет
            _user4.default.findOne({ login: socket.handshake.doc.user.login }, function (err, docz) {
                if (docz) {
                    docz.online = true;
                    docz.save();
                }
                console.log('WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOw');
            });
            userxl[socket.handshake.doc.user.login] = {
                socketId: [socket.id],
                userId: socket.handshake.doc.user.login,
                device: [socket.handshake.doc.device]
            };
            console.log('add new user');
        } else {
            // Добавляем новый сокет, если такой пользователь уже существует
            userxl[socket.handshake.doc.user.login].socketId.push(socket.id);
            // socket.nickname = data;
            // userxl[socket.nickname] = socket;

            console.log('add new socket');
        }
    } else {}
    // socket.on('new user', function (data) {
    //     console.log(data);
    //     console.log("on new user");
    //
    //
    // });
    socket.on('disconnect', function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(data, callback) {
            var id, index;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            id = socket.handshake.doc.user.login;
                            // console.log('user disconnected: ' + login);

                            console.log('user disconnected: ' + id);

                            // Если текущий пользователь в онлайне
                            if (!empty(userxl[id])) {
                                // получаем индекс удаляемого сокета
                                index = userxl[id].socketId.indexOf(socket.id);
                                // Спроверяем количество сокетов в онлайте у данного пользователя

                                if (userxl[id].socketId.length > 1) {
                                    // удаляем только сокет, если сокеты еще есть
                                    console.log('user close socket', { user: id });
                                    userxl[id].socketId.splice(index, 1);
                                    // userxl[id].device.splice(index,1);
                                } else {
                                    // удаляем сокет и рассылаем сообщения, что пользователь покинул чат, если сокет был последний
                                    console.log('user delete socket', { user: id });
                                    _user4.default.findOne({ login: socket.handshake.doc.user.login }, function (err, docz) {
                                        if (docz) {
                                            docz.online = false;
                                            docz.lastvisit = _unixTimestamp2.default.now();
                                            docz.save();
                                        }
                                    });
                                    delete userxl[id];
                                    // console.log('user leave chat', {user:id});
                                    // io.emit('leave chat', {user:id});
                                }
                                // log({'online users': onlineUsers});
                            }

                        case 3:
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
    socket.on('check connection', function (data, callback) {
        console.log('check connection');
        socket.emit('check connection', 'connection ready');
    });
    socket.on('send message', function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(data, callback) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            //User.findOne({login:data.reciver},async function(err, data) {
                            if (empty(data.message) || empty(data.reciver)) {
                                socket.emit('send message', 'message dont have reciver or message');
                            } else {
                                _user4.default.findOne({ login: data.reciver }, function () {
                                    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(err, dataxx) {
                                        var credentials;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        credentials = {
                                                            message: data.message,
                                                            sender: data.sender,
                                                            reciver: data.reciver,
                                                            dialogid: data.dialogid,
                                                            date: _unixTimestamp2.default.now(),
                                                            timestamp: parseInt(_unixTimestamp2.default.now())
                                                        };

                                                        console.log(credentials);
                                                        data.avatar = dataxx.avatar;
                                                        data.fio = dataxx.firstname + ' ' + dataxx.lastname;
                                                        socket.emit('send message', credentials);

                                                        _context3.prev = 5;
                                                        _context3.next = 8;
                                                        return _Messages2.default.create(credentials);

                                                    case 8:
                                                        _Dialogs2.default.findOne({ _id: data.dialogid }, function (err, docsxl) {
                                                            console.log(docsxl);
                                                            if (docsxl) {
                                                                docsxl.lastmessage = data.message;
                                                                docsxl.save();
                                                            }
                                                        });
                                                        if (data.reciver in userxl) {
                                                            // userxl[data.reciver].emit('send message', data);

                                                            userxl[data.reciver].socketId.forEach(function (socketId) {
                                                                // Новое сообщение для получателя

                                                                io.sockets.connected[socketId].emit('new message', credentials);
                                                            });
                                                        }
                                                        _context3.next = 15;
                                                        break;

                                                    case 12:
                                                        _context3.prev = 12;
                                                        _context3.t0 = _context3['catch'](5);

                                                        socket.emit('send message', 'message not saved in db');

                                                    case 15:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, this, [[5, 12]]);
                                    }));

                                    return function (_x7, _x8) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }());
                            }

                        case 1:
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
});

function empty(elem) {

    // console.log('====>     function empty');
    // log({variable:elem});

    if (elem === undefined) {
        // console.log('return true - undefined');
        return true;
    }
    if (!elem && elem !== 0 && elem !== false) {
        // console.log('return true - unknown');
        return true;
    }
    if (elem instanceof String && elem.trim() === '') {
        // console.log('return true - empty string');
        return true;
    }
    if (elem instanceof Array && elem.length === 0) {
        // console.log('return true - epmty array');
        return true;
    }
    if (elem instanceof Object && elem === {}) {
        // console.log('return true - empty object');
        return true;
    }
    if (elem == null || elem === null) {
        // console.log('return true - null ');
        return true;
    }

    // console.log('return false');
    return false;
}

app.listen(_config2.default.port, function (err) {
    if (err) throw err;
    console.log('Server listening on port ' + _config2.default.port);
});
app.use((0, _morgan2.default)('tiny'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static('./uploads'));
app.use((0, _expressSession2.default)({
    resave: true,
    saveUninitialized: true,
    secret: _config2.default.secret
}));
app.use('/avatars', _express2.default.static('./uploads'));
app.use('/api', _page2.default);
app.use('/api', _settings2.default);
app.use('/api', _AddSocialWebs2.default);
app.use('/api', _dialogs2.default);
app.use('/api', _smsru2.default);
app.use('/api', _auth2.default);
app.use('/api', _checkToken2.default, _user2.default);
app.use(_errorHandler2.default);
app.use(_getUser2.default);
app.use('/api', _checkToken2.default, _page2.default);
//# sourceMappingURL=server.js.map