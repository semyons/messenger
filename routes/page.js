/**
 * Created by Semyon on 31.03.2017.
 */
import express from 'express';
import * as PageController from '../controllers/page';
const router = express.Router();
router.post('/createpages',PageController.createUser);
router.post('/getpages',PageController.getAllUser);
router.post('/getcurrent',PageController.getcurrent);
router.post('/addlike',PageController.addlike);
router.post('/addcomment',PageController.addcomment);
router.post('/removecomment',PageController.removecomment);
router.post('/getcomments',PageController.getcomments);
router.post('/removenews',PageController.removenews);
export default router;