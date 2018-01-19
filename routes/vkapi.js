/**
 * Created by Semyon on 01.05.2017.
 */
import express from 'express';
import * as VkAPI from '../controllers/vkapi';
const router = express.Router();
router.post('/vkapisend',VkAPI.vkapiSendMessage);
router.post('/getvklongpoll',VkAPI.vkapiGetLongPoll);
router.post('/getvkhistory',VkAPI.vkapiGetHistory);
router.post('/vkapistartlongpoll',VkAPI.vkapiStartLongPoll);
router.post('/vkapiget',VkAPI.vkapiget);
export default router;