'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comments = new _mongoose.Schema({
    creator: { type: String, require: true },
    name: { type: String, require: true },
    avatar: { type: String, require: true },
    date: { type: Date, require: true },
    message: { type: String, require: true },
    newsid: { type: String, require: true }
}); /**
     * Created by Semyon on 04.09.2017.
     */
exports.default = _mongoose2.default.model('Comments', Comments);
//# sourceMappingURL=Comments.js.map