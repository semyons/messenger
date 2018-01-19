/**
 * Created by Semyon on 24.07.2017.
 */
import Dialogs from '../models/Dialogs';
import User from '../models/user';
import Messages from '../models/Messages';
import parse from 'parse-json-response';
const https = require('https');

export const createdialog = async (req, res, next) => {
    const credentials = {
        secondguy: req.body.secondguy
    };
    try {
        User.findOne({ourtoken: req.headers.ourtoken}, async function (err, userx) {
            if (userx) {
                let newdialog;
                const Dialog = Dialogs.findOne({
                    $or: [{firstguy: userx.login, secondguy: credentials.secondguy},
                        {firstguy: credentials.secondguy, secondguy: userx.login}]
                }, async function (err, docs) {

                    if (!docs) {
                        Dialogs.findOne({login: credentials.secondguy}, async function (err, usery) {
                                if (!usery) {

                                    try {
                                        newdialog = await Dialogs.create({
                                            firstguy: userx.login,
                                            secondguy: credentials.secondguy
                                        });
                                    } catch (err) {
                                        res.json({
                                            success: false,
                                            status: 400,
                                            message: 'bad credentials'
                                        });
                                    }
                                    res.json({
                                        success: true,
                                        firstguy: newdialog.firstguy,
                                        secondguy: newdialog.secondguy,
                                        id: newdialog.id,
                                        update: newdialog.updated,
                                        lastmessage: newdialog.lastmessage
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        message: 'Cant find user ' + credentials.secondguy
                                    })
                                }
                            }
                        );
                    } else {
                        res.json({
                            success: false,
                            message: 'Dialog already exist.',
                            dialogid: docs.id
                        });

                    }
                });
            } else {
                res.json({
                    success: false,
                    status: 400,
                    message: 'Cant find user with this token. Check your token'
                });
            }

        });
    } catch (err) {
        res.json({
            success: false,
            status: 400,
            message: 'Something goes bad(semyon ne vinovat(ni v chem))'
        });
    }

};
export const getdialogs = async (req, res, next) => {
    const limit = Number.parseInt(req.body.limit);
    const skip = Number.parseInt(req.body.skip);

    try {
        User.findOne({ourtoken: req.headers.ourtoken}, async function (err, userx) {
            if (userx) {
                let person = userx.login;
                console.log(person + '-LOLOLOLOLOLOLOOLLO');
                Dialogs.find({$or: [{firstguy: person}, {secondguy: person}]},
                    ['firstguy', 'lastmessage', 'secondguy', 'id', 'updated'],
                    {skip: skip, limit: limit, sort: {updated: -1}}, async function (err, docs) {
                        console.log(docs);
                        if (!docs.length) {
                            res.json({
                                success: false,
                                message: 'you dont have dialogs yet'
                            });
                        } else {

                            var finalresponse = ({
                                success: true,
                                dialog_list: []
                            });

                            for (let i = 0; i < docs.length; i++) {
                                if (i === 0) {
                                    var checkcicle = 1;
                                }

                                if (docs[i].firstguy === person) {
                                    User.findOne({login: docs[i].secondguy}, async function (err, userok) {

                                        if (userok) {
                                            if (userok.firstname && userok.lastname) {
                                                var obj = {
                                                    reciver: docs[i].secondguy,
                                                    dialogid: docs[i]._id,
                                                    lastmessage: docs[i].lastmessage,
                                                    updated: docs[i].updated,
                                                    name: userok.firstname + ' ' + userok.lastname,
                                                    avatar: userok.avatar,
                                                    idvk: userok.idvk,
                                                    idfb:userok.idfb,
                                                    idinsta:userok.idinsta,
                                                    idok:userok.idok
                                                };
                                            } else {
                                                var obj = {
                                                    reciver: docs[i].secondguy,
                                                    dialogid: docs[i]._id,
                                                    lastmessage: docs[i].lastmessage,
                                                    updated: docs[i].updated,
                                                    name: docs[i].secondguy,
                                                    avatar: userok.avatar,
                                                    idvk: userok.idvk,
                                                    idfb:userok.idfb,
                                                    idinsta:userok.idinsta,
                                                    idok:userok.idok
                                                };
                                            }
                                            finalresponse.dialog_list.push(obj);
                                            let currrent = i + 1;
                                            console.log('odin proshel_' + currrent);
                                            if (parseInt(checkcicle) === parseInt(docs.length)) {
                                                console.log('uehal iz 1');
                                                res.json(finalresponse);
                                            }
                                            checkcicle++;
                                            console.log(checkcicle + 'rolf');
                                        } else {
                                            checkcicle++;
                                        }
                                        // else{
                                        //     res.json({
                                        //         success:false,
                                        //         message:'cant find user with this login'
                                        //     });
                                        // }
                                    });
                                } else {
                                    User.findOne({login: docs[i].firstguy}, function (err, userok) {
                                        if (userok) {
                                            if (userok.firstname && userok.lastname) {
                                                var obj = {
                                                    reciver: docs[i].firstguy,
                                                    dialogid: docs[i]._id,
                                                    lastmessage: docs[i].lastmessage,
                                                    updated: docs[i].updated,
                                                    name: userok.firstname + ' ' + userok.lastname,
                                                    avatar: userok.avatar,
                                                    idvk: userok.idvk,
                                                    idfb:userok.idfb,
                                                    idinsta:userok.idinsta,
                                                    idok:userok.idok
                                                };
                                            } else {
                                                var obj = {
                                                    reciver: docs[i].firstguy,
                                                    dialogid: docs[i]._id,
                                                    lastmessage: docs[i].lastmessage,
                                                    updated: docs[i].updated,
                                                    name: docs[i].firstguy,
                                                    avatar: userok.avatar,
                                                    idvk: userok.idvk,
                                                    idfb:userok.idfb,
                                                    idinsta:userok.idinsta,
                                                    idok:userok.idok
                                                };
                                            }
                                            finalresponse.dialog_list.push(obj);
                                            let currrent = i + 1;
                                            console.log('odin proshel_' + currrent);
                                            if (parseInt(checkcicle) === parseInt(docs.length)) {
                                                res.json(finalresponse);
                                                console.log('uehal iz 2');
                                            }
                                            checkcicle++;
                                        } else {
                                            checkcicle++;
                                        }
                                        //     else{
                                        //     res.json({
                                        //         success:false,
                                        //         message:'cant find user with this login'
                                        //     });
                                        // }
                                    });
                                }
                            }

                        }
                    });
            } else {
                res.json({
                    success: false,
                    status: 400,
                    message: 'Cant find user with this token. Check your token'
                });
            }
        });
    } catch (err) {
    }
};
export const getmessages = async (req, res, next) => {
    const limit = Number.parseInt(req.body.limit);
    const skip = Number.parseInt(req.body.skip);
    console.log(req.body.dialogid);
    User.findOne({ourtoken: req.headers.ourtoken}, function (err, docx) {
        if (err) {
            res.json({
                success: false,
                message: 'some error while finding user by token'
            })
        } else {
            if (docx) {
                Messages.find({dialogid: req.body.dialogid},
                    ['date', 'message', 'sender', 'reciver', 'dialogid', 'timestamp'],
                    {skip: skip, limit: limit, sort: {date: 1}}, function (err, docs) {
                        if (!docs.length) {
                            res.json({
                                success: false,
                                message: 'you dont have messages yet'
                            });
                        } else {
                            let response = {
                                success: true,
                                message_list: []
                            };
                            Array.prototype.push.apply(response.message_list, docs);
                            res.json(response);
                        }
                    });
            } else {
                let response = {
                    success: true,
                    message_list: []
                };
                res.json(response);
            }
        }
    });

};
export const getuser = async (req, res, next) => {
    var response = {
        success: true,
        user_list: []
    };
    if (req.body.list){
    var registered = [];
    var unregistered = [];
    var gsonlist = req.body.list;
    gsonlist = JSON.parse(gsonlist);
    console.log(gsonlist);
    function compareAge(a, b) {
        var c = a.name.toUpperCase(),
            d = b.name.toUpperCase();

        if (c < d) {
            return -1;
        } else if (c > d) {
            return 1;
        }

        return 0;
    };

     for (let i = 0; i < gsonlist.length; i++) {

        gsonlist[i].phone = parseInt(gsonlist[i].phone.replace(/\D+/g, "")).toString(10);
        if (gsonlist[i].phone[0] == '8') {
            gsonlist[i].phone = gsonlist[i].phone.slice(1, gsonlist[i].phone.length);
            gsonlist[i].phone = '7' + gsonlist[i].phone;
        }
        if (i === 0) {
            var checker = 1;
        }
        User.findOne({login: gsonlist[i].phone}, function (err, docs) {

            if (docs) {
                let variable = {
                    phone: gsonlist[i].phone,
                    avatar: docs.avatar,
                    name: gsonlist[i].name,
                    id: docs.login,
                    isRegistered: true
                };
                registered.push(variable);
                if (parseInt(checker) === parseInt(gsonlist.length)) {
                    response.user_list = response.user_list.concat(registered.sort(compareAge));
                    response.user_list = response.user_list.concat(unregistered.sort(compareAge));
                    res.json(response);
                } else {
                    checker++;
                }
            } else {
                let variable = {
                    phone: gsonlist[i].phone,
                    avatar: gsonlist[i].avatar,
                    name: gsonlist[i].name,
                    isRegistered: false
                };
                unregistered.push(variable);
                if (parseInt(checker) === parseInt(gsonlist.length)) {
                    response.user_list = response.user_list.concat(registered.sort(compareAge));
                    response.user_list = response.user_list.concat(unregistered.sort(compareAge));
                    res.json(response);
                } else {
                    checker++;
                }
            }

        });
    }
    }else{
        res.json(response);
    }
};

export const getuserinfo = async (req, res, next) => {
    User.findOne({ourtoken: req.headers.ourtoken}, function (err, docs) {
        if (err) {
            res.json({
                success: false,
                message: 'some error with request'
            });
        } else {
            if (docs) {
                res.json({
                    success: true,
                    login: docs.login,
                    email: docs.email,
                    firstname: docs.firstname,
                    lastname: docs.lastname,
                    avatar: docs.avatar,
                    idvk: docs.idvk,
                    idfb:docs.idfb,
                    idinsta:docs.idinsta,
                    idok:docs.idok,
                    online:docs.online,
                    lastvisit:docs.lastvisit
                });
            } else {
                res.json({
                    success: false,
                    message: 'cant find user with this token'
                })
            }
        }
    });
};
export const getuserbylogin = async (req, res, next) => {
    User.findOne({login: req.body.login}, function (err, docs) {
        if (err) {
            res.json({
                success: false,
                message: 'some error with request'
            });
        } else {
            if (docs) {
                res.json({
                    success: true,
                    login: docs.login,
                    email: docs.email,
                    firstname: docs.firstname,
                    lastname: docs.lastname,
                    avatar: docs.avatar,
                    idvk: docs.idvk,
                    idfb:docs.idfb,
                    idinsta:docs.idinsta,
                    idok:docs.idok,
                    online:docs.online,
                    lastvisit:docs.lastvisit
                });
            } else {
                res.json({
                    success: false,
                    message: 'cant find user with this login'
                })
            }
        }
    });
};
export const deletemessage = async (req, res, next) => {
    Messages.findByIdAndRemove(req.body.id, function (err, todo) {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        var response = {
            message: "Todo successfully deleted",
            id: todo._id
        };
        res.send(response);
    });
};