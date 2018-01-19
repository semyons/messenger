'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageSchema = new _mongoose.Schema({
    title: { type: String, require: true, unique: false },
    body: { type: String, require: true, unique: false },
    url: { type: String, unique: false },
    createdAt: { type: Date, require: true, unique: false },
    creator: { type: String, require: true, unique: false },
    creatorname: { type: String, require: true, unique: false },
    creatorType: { type: String, require: true, unique: false },
    creatorava: { type: String, default: 'default.jpg', unique: false },
    like: [],
    type: { type: String, require: true, unique: false },
    commentcount: { type: Number, default: 0, unique: false },
    createAtUnix: { type: Number }
}); /**
     * Created by Semyon on 31.03.2017.
     */
exports.default = _mongoose2.default.model('Page', PageSchema);
//# sourceMappingURL=page.js.map