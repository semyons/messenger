/**
 * Created by Semyon on 31.03.2017.
 */
import express from 'express';
import User from '../models/user';
var randomstring = require("randomstring");
var SMSru = require('sms_ru');
var sms = new SMSru('AA0C7A43-90D1-284B-C28E-CD6C22088350');
const router = express.Router();
router.post('/smssend', async function (req, res) {
    const login = req.body.login;
    const code = await randomstring.generate({
        length: 5,
        charset: 'numeric'
    });
    User.findOne({login: login}, async function (err, userx) {
        if (err) {
            res.json('User not found');
        }
        else {
            sms.sms_send({
                to: login,
                text: code
            }, function (e) {
                console.log(e.description);
            });
            if (userx.smscount !== null) {
                if (userx.smscount < 15) {
                    userx.smscount++;
                    userx.checkcode = code;
                    console.log(code);
                    userx.save();
                    res.json({
                        success: true,
                        status: 200,
                        message: 'sms was successfully sended'
                    });
                }
                else {
                    res.json({
                        success: false,
                        status: 400,
                        message: 'You exceeded the sms-limit'
                    });
                }
            }else {
                    userx.checkcode = code;
                    console.log(code);
                    userx.save();
                    res.json({
                        success: true,
                        status: 200,
                        message: 'sms was successfully sended'
                    });

            }

        }
    });
});
router.post('/checksms', async function (req, res) {
    const login = req.body.login;
    User.findOne({login: login}, async function (err, userx) {
        if (err) {
            res.json({
                success: false,
                status: 400,
                message: 'user not found'
            });
        }
        else {
            if (userx.checkcode === req.body.checkcode) {
                if (req.body.password) {
                    userx.password = req.body.password;
                    userx.save();
                    res.json({
                        success: true,
                        message: 'password changed'
                    })
                } else {
                    userx.confirmed = 1;
                    userx.save();
                    res.json({
                        success: true,
                        message: 'account was confirmed'
                    });
                }
            }
            else {
                res.json({
                    success: false,
                    status: 400,
                    message: 'wrong checkcode'
                });
            }
        }
    });
});

/*
 res.json(user);
 }else{
 doc.user('login','12312312');
 User.save();
 res.json(user);}
 });*/

export default router;