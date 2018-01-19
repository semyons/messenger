'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Messages = new _mongoose.Schema({
    date: { type: Date, default: Date.now() },
    dialogid: String,
    message: String,
    sender: String,
    reciver: String,
    timestamp: { type: Number }
}); /**
     * Created by Semyon on 22.07.2017.
     */
exports.default = _mongoose2.default.model('Messages', Messages);
//# sourceMappingURL=Messages.js.map