'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialogs = new _mongoose.Schema({
    firstguy: { type: String, required: true },
    secondguy: { type: String, requied: true },
    updated: { type: Date, default: Date.now() },
    lastmessage: { type: String, default: 'There are no messages yet', requied: true }
}); /**
     * Created by Semyon on 22.07.2017.
     */
exports.default = _mongoose2.default.model('Dialogs', Dialogs);
//# sourceMappingURL=Dialogs.js.map