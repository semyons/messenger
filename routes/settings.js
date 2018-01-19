import express from 'express';
import multer from 'multer';
const router = express.Router();
import User from '../models/user';
import Page from '../models/page'
import Comments from '../models/Comments';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({storage: storage});

router.post('/setavatar', upload.single('avatar'), function (req, res) {
    User.findOne({ourtoken: req.headers.ourtoken}, function (err, data) {
        if (data) {
            if (req.file) {
                data.avatar = req.file.filename;
                data.save();
                Page.find({creator: data.login}, async function (err, datax) {
                    for (let i = 0; i < datax.length; i++) {
                        datax[i].creatorava = req.file.filename;
                        datax[i].save();

                    }

                });
                Comments.find({creator: data.login}, async function (err, datay) {
                    for (let i = 0; i < datax.length; i++) {
                        datay[i].avatar = req.file.filename;
                        datay[i].save();

                    }

                });
                res.json({
                    success: true,
                    filepath: req.file.filename
                });
            } else {
                res.json({
                    success: false,
                    message: 'file isnt uploaded'
                });
            }
        } else {
            res.json({
                success: false,
                message: 'cant find user with this token'
            });
        }
    });
});
router.post('/setname', async function (req, res) {
    User.findOne({ourtoken: req.headers.ourtoken}, async function (err, data) {
        if (data && req.body.firstname && req.body.lastname) {
            data.firstname = req.body.firstname;
            data.lastname = req.body.lastname;
            data.save();
            Page.find({creator: data.login}, async function (err, datax) {
                for (let i = 0; i < datax.length; i++) {
                    datax[i].creatorname = req.body.firstname+' '+req.body.lastname;
                    datax[i].save();

                }

            });
            Comments.find({creator: data.login}, async function (err, datay) {
                for (let i = 0; i < datay.length; i++) {
                    datay[i].name = req.body.firstname+' '+req.body.lastname;
                    datay[i].save();

                }

            });
            res.json({
                success: true,
                message: 'new data was added'
            });
        } else {
            res.json({
                success: false,
                message: 'u dont send first or secondname, or we cant find user by token'

            });
        }
    });
});
router.post('/uploadimage', upload.single('image'), function (req, res) {
    User.findOne({ourtoken: req.headers.ourtoken}, function (err, data) {
        if (data) {
            if (req.file) {
                res.json({
                    success: true,
                    filepath: req.file.filename
                });
            } else {
                res.json({
                    success: false,
                    message: 'file isnt uploaded'
                });
            }
        } else {
            res.json({
                success: false,
                message: 'cant find user with this token'
            });
        }
    });
});
export default router;
/**
 * Created by Anatola on 06.08.2017.
 */
