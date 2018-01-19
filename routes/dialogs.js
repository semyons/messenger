/**
 * Created by Semyon on 24.07.2017.
 */
import express from 'express';
import * as dialogs from '../controllers/dialogs';
const router = express.Router();
router.post('/getdialogs', dialogs.getdialogs);
router.post('/createdialog', dialogs.createdialog);
router.post('/getmessages',dialogs.getmessages);
router.post('/getuser',dialogs.getuser);
router.post('/getuserinfo',dialogs.getuserinfo);
router.post('/getuserbylogin',dialogs.getuserbylogin);
router.post('/deletemessage',dialogs.deletemessage);
export default router;