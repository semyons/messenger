'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dialogs = require('../controllers/dialogs');

var dialogs = _interopRequireWildcard(_dialogs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Semyon on 24.07.2017.
 */
var router = _express2.default.Router();
router.post('/getdialogs', dialogs.getdialogs);
router.post('/createdialog', dialogs.createdialog);
router.post('/getmessages', dialogs.getmessages);
router.post('/getuser', dialogs.getuser);
router.post('/getuserinfo', dialogs.getuserinfo);
router.post('/getuserbylogin', dialogs.getuserbylogin);
router.post('/deletemessage', dialogs.deletemessage);
exports.default = router;
//# sourceMappingURL=dialogs.js.map