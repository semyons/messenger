/**
 * Created by Semyon on 31.03.2017.
 */
import Page from '../models/page';
import User from '../models/user';
import Comments from '../models/Comments';
import timestamp from 'unix-timestamp';
timestamp.round=true;
export async function createUser(req, res, next) {
    const credentials = ({
        body: req.body.pagebody,
        title: req.body.title,
        url: req.body.url,
        createdAt: Date.now(),
        type: 'user'

    });
    User.findOne({ourtoken: req.headers.ourtoken}, async function (err, data) {
        if (data) {
            credentials.creator = data.login;
            credentials.creatorava = data.avatar;
            credentials.creatorname = data.firstname+' '+data.lastname;
            credentials.createAtUnix = timestamp.now();
            try {
                var page = await Page.create(credentials);
            } catch ({message}) {
                return next({
                    status: 400,
                    message
                });
            }
            res.json({
                success: true,
                message: 'page was created'
            });
        } else {
            res.json({
                success: false,
                message: 'your token is wrong'
            });
        }
    });

}
export async function getAllUser(req, res, next) {
    User.findOne({ourtoken: req.headers.ourtoken}, async function (err, data) {
        let skip = req.body.skip;
        let limit = req.body.limit;
        if (data) {
            var finalresponse = ({
                success: true,
                news_list: []
            });
            try {
                finalresponse.news_list = await Page.find({}, ['title', 'url', 'body', 'createdAt', 'creator', 'creatorava','creatorname', 'like', 'commentcount','createAtUnix'], {
                    skip: skip,
                    limit: limit,
                    sort: {createdAt: -1}
                });
            } catch ({message}) {
                return next({
                    status: 500,
                    message
                });
            }
            res.json(finalresponse);
        } else {
            res.json({
                success: false,
                message: 'your token is wrong'
            });
        }
    });
}

export async function getcurrent(req, res, next) {
    User.findOne({ourtoken: req.headers.ourtoken}, async function (err, data) {
        let skip = req.body.skip;
        let limit = req.body.limit;
        if (data) {
            var finalresponse = ({
                success: true,
                news_list: []
            });
            try {
                finalresponse.news_list = await Page.find({creator: req.body.creator}, ['title', 'url', 'body', 'createdAt', 'creator','creatorname', 'creatorava', 'like', 'commentcount','createAtUnix'], {
                    skip: skip,
                    limit: limit,
                    sort: {createdAt: -1}
                });
            } catch ({message}) {
                return next({
                    status: 500,
                    message
                });
            }
            res.json(finalresponse);
        } else {
            res.json({
                success: false,
                message: 'your token is wrong'
            });
        }
    });

}
export async function addlike(req, res, next) {
    User.findOne({ourtoken: req.headers.ourtoken}, async function (err, data) {
        if (data) {
            Page.findOne({_id: req.body.id}, async function (err, datanews) {
                if (datanews) {
                    if (datanews.like.indexOf(data.login) != -1) {
                        datanews.like.splice(datanews.like.indexOf(data.login), 1);
                        datanews.save();
                        res.json({
                            success: true,
                            islike: false,
                            likescount: datanews.like.length,
                            likers: datanews.like
                        })

                    } else {
                        datanews.like.push(data.login);
                        datanews.save();
                        res.json({
                            success: true,
                            islike: true,
                            likescount: datanews.like.length,
                            likers: datanews.like
                        })
                    }
                } else {
                    res.json({
                        success: false,
                        message: 'cant find news by id'
                    })
                }
            })
        } else {
            res.json({
                success: false,
                message: 'cant find user by token'
            })
        }
    })
}
export async function addcomment(req, res, next) {
    User.findOne({ourtoken: req.headers.ourtoken}, async function (err, data) {
        if (data) {
            Page.findOne({_id: req.body.id}, async function (err, datanews) {
                if (datanews) {
                    let credentials = {
                        creator: data.login,
                        date: timestamp.now(),
                        name: data.firstname + ' ' + data.lastname,
                        avatar: data.avatar,
                        message: req.body.message,
                        newsid: req.body.id
                    };
                    await Comments.create(credentials);
                    console.log(credentials);
                    datanews.commentcount++;
                    datanews.save();
                    res.json({
                        success: true,
                        message: 'comment created',

                    })
                } else {
                    res.json({
                        success: false,
                        message: 'cant find news by id'
                    })
                }
            })
        } else {
            res.json({
                success: false,
                message: 'cant find user by token'
            })
        }
    })
}
export async function removecomment(req, res, next) {
    User.findOne({ourtoken: req.headers.ourtoken}, async function (err, data) {
        if (data) {
            Comments.findOne({_id: req.body.commentid}, async function (err, datacomment) {
                if (data) {
                    if (datacomment.creator === data.login) {
                        datacomment.remove();
                        Page.findOne({_id: datacomment.newsid}, async function (err, news) {
                            news.commentcount--;
                            news.save();
                        });
                        res.json({
                            success: true,
                            commentid: req.body.commentid + ' was removed'
                        })
                    } else {
                        res.json({
                            success: false,
                            message: 'You cant remove comments of other users'
                        })
                    }
                } else {
                    res.json({
                        success: false,
                        message: 'cant find comment with this id'
                    })
                }
            })
        } else {
            res.json({
                success: false,
                message: 'cant find user by token'
            })
        }
    })
}
export async function removenews(req, res, next) {
    User.findOne({ourtoken: req.headers.ourtoken}, async function (err, data) {
        if (data) {
            Page.findOne({_id: req.body.newsid}, async function (err, datanews) {
                if (datanews) {
                    if (datanews.creator === data.login) {
                        datanews.remove();
                        res.json({
                            success: true,
                            newsid: req.body.newsid + ' was removed'
                        })
                    } else {
                        res.json({
                            success: false,
                            message: 'You cant remove news of other users'
                        })
                    }
                } else {
                    res.json({
                        success: false,
                        message: 'cant find news with this id'
                    })
                }
            })
        } else {
            res.json({
                success: false,
                message: 'cant find user by token'
            })
        }
    })
}
export async function getcomments(req, res, next) {
    User.findOne({ourtoken: req.headers.ourtoken}, async function (err, data) {
        if (data) {
            var response = {
                success: true,
                comment_list: []
            };
            response.comment_list = await Comments.find({newsid: req.body.newsid}, [], {
                skip: req.body.skip,
                limit: req.body.limit,
                sort: {date: -1}
            });
            console.log(response.comment_list);
            res.json(response);
        }
        else {
            res.json({
                success: false,
                message: 'cant find user by token'
            })
        }
    })
}