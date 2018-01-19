/**
 * Created by Semyon on 24.07.2017.
 */
import express from 'express';
import * as socialwebs from '../controllers/socialwebs';
const router = express.Router();
router.post('/changesocialwebs', socialwebs.addsocialweb);
export default router;