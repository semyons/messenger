'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by Semyon on 30.03.2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var UserSchema = new _mongoose.Schema({
    ourtoken: { type: String, unique: false, default: 0 },
    login: { type: String, unique: true },
    email: { type: String, required: false },
    smscount: { type: Number, default: 0 },
    confirmed: { type: Number, default: 0 },
    lastname: { type: String },
    firstname: { type: String },
    avatar: { type: String, default: 'default.jpg' },
    password: String,
    idvk: String,
    idfb: String,
    idinsta: String,
    idok: String,
    checkcode: String,
    online: Boolean,
    lastvisit: Number
});

UserSchema.pre('save', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(next) {
        var salt, hash;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (this.isModified('password')) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt('return', next());

                    case 2:
                        _context.next = 4;
                        return _bcrypt2.default.genSalt(10);

                    case 4:
                        salt = _context.sent;
                        _context.next = 7;
                        return _bcrypt2.default.hash(this.password, salt);

                    case 7:
                        hash = _context.sent;


                        this.password = hash;
                        next();

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

UserSchema.methods.comparePasswords = function (password) {
    return _bcrypt2.default.compare(password, this.password);
};

exports.default = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map