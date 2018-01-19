'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _page = require('../controllers/page');

var PageController = _interopRequireWildcard(_page);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Semyon on 31.03.2017.
 */
var router = _express2.default.Router();
router.post('/createpages', PageController.createUser);
router.post('/getpages', PageController.getAllUser);
router.post('/getcurrent', PageController.getcurrent);
router.post('/addlike', PageController.addlike);
router.post('/addcomment', PageController.addcomment);
router.post('/removecomment', PageController.removecomment);
router.post('/getcomments', PageController.getcomments);
router.post('/removenews', PageController.removenews);
exports.default = router;
//# sourceMappingURL=page.js.map