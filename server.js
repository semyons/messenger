/**
 * Created by Semyon on 30.03.2017.
 */
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';
import timestamp from 'unix-timestamp';
timestamp.round=true;
import config from './config';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import pageRoute from './routes/page';
import DialogsRoute from './routes/dialogs';
import errorHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';
import getUser from './middlewares/getUser';
import * as UserService from './services/UserService';
import smsru from './routes/smsru';
import AddSocialWebs from './routes/AddSocialWebs';
import pages from './routes/page';
import settings from './routes/settings';
import Messages from './models/Messages';
import Dialogs from './models/Dialogs';

import User from './models/user';
const app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
mongoose.Promise = bluebird;

mongoose.connect(config.database, {useMongoClient: true}, err => {
    if (err) {
        throw err
    }
    console.log('MongoConnected');
});
server.listen(3000);
var userxl = {};
let connectedUsers = {};
io.use(async function (socket, next) {
    let handshakeData = socket.request;
    // Если есть токен
    if (handshakeData._query.token !== undefined && connectedUsers[handshakeData._query.token] === undefined) {
        let token = handshakeData._query.token;
        let device = handshakeData._query.device;
        if (device === undefined) {
            device = '';
        }
        connectedUsers[token] = token;
        // авторизация пользователя
        // Пытаемся найти пользователя у себя в базе
        let user = await UserService.getUserByToken(token);
        socket.handshake.doc = {token, user, device};
        delete connectedUsers[token];
        next();
    }
    else {
        if (connectedUsers[handshakeData._query.token] !== undefined) {
            console.log({
                'socket': socket.id,
                'token': handshakeData._query.token,
                'device': handshakeData._query.device + ' - canceled'
            });
        } else {
            console.log({'socket': socket.id, 'token': 'none', 'device': handshakeData._query.device});
        }
    }

});

io.on('connection', function (socket) {
    console.log('added new connection');
    if (socket.handshake.doc.user){
    if (empty(userxl[socket.handshake.doc.user.login])) {
        //Добавляем текущего пользователя в ОнЛайн, если его нет
        User.findOne({login:socket.handshake.doc.user.login},function (err,docz) {
            if(docz){
                docz.online=true;
                docz.save();
            }
        });
        userxl[socket.handshake.doc.user.login] = {
            socketId: [socket.id],
            userId: socket.handshake.doc.user.login,
            device: [socket.handshake.doc.device],
        };
        console.log('new user was added ');

    } else {
        // Добавляем новый сокет, если такой пользователь уже существует
        userxl[socket.handshake.doc.user.login].socketId.push(socket.id);
        console.log('new socket was added ');
    }}else{}
    socket.on('disconnect', async function (data, callback) {
        let id = socket.handshake.doc.user.login;
        console.log('user disconnected: ' + id);

        // Если текущий пользователь в онлайне
        if (!empty(userxl[id])) {
            // получаем индекс удаляемого сокета
            let index = userxl[id].socketId.indexOf(socket.id);
            // Спроверяем количество сокетов в онлайте у данного пользователя
            if (userxl[id].socketId.length > 1) {
                // удаляем только сокет, если сокеты еще есть
                console.log('user close socket', {user: id});
                userxl[id].socketId.splice(index, 1);
                // userxl[id].device.splice(index,1);
            } else {
                // удаляем сокет и рассылаем сообщения, что пользователь покинул чат, если сокет был последний
                console.log('user delete socket', {user: id});
                User.findOne({login:socket.handshake.doc.user.login},function (err,docz) {
                    if(docz){
                        docz.online=false;
                        docz.lastvisit=timestamp.now();
                        docz.save();
                    }
                });
                delete userxl[id];
            }
        }
    });
    socket.on('check connection', function (data, callback) {
        console.log('check connection');
        socket.emit('check connection', 'connection ready');
    });
    socket.on('send message', async function (data, callback) {
        //User.findOne({login:data.reciver},async function(err, data) {
        if (empty(data.message) || empty(data.reciver)) {
            socket.emit('send message', 'message dont have reciver or message');
        } else {
            User.findOne({login:data.reciver},async function(err, dataxx){
            const credentials = {
                message: data.message,
                sender: data.sender,
                reciver: data.reciver,
                dialogid: data.dialogid,
                date:timestamp.now(),
                timestamp: parseInt(timestamp.now())
            };
                console.log(credentials);
            data.avatar=dataxx.avatar;
            data.fio=dataxx.firstname+' '+dataxx.lastname;
            socket.emit('send message', credentials);

            try {
                await Messages.create(credentials);
                Dialogs.findOne({_id: data.dialogid}, function (err, docsxl) {
                    console.log(docsxl);
                    if (docsxl) {
                        docsxl.lastmessage = data.message;
                        docsxl.save();
                    }

                });
                if (data.reciver in userxl) {
                    // userxl[data.reciver].emit('send message', data);

                    userxl[data.reciver].socketId.forEach(socketId => {
                        // Новое сообщение для получателя

                        io.sockets.connected[socketId].emit('new message', credentials);

                    });



                }
            } catch (err) {
                socket.emit('send message', 'message not saved in db');
            }


            //});
        })}
    });
});


function empty(elem) {

    // console.log('====>     function empty');
    // log({variable:elem});

    if (elem === undefined) {
        // console.log('return true - undefined');
        return true;
    }
    if (!elem && elem !== 0 && elem !== false) {
        // console.log('return true - unknown');
        return true;
    }
    if (elem instanceof String && elem.trim() === '') {
        // console.log('return true - empty string');
        return true;
    }
    if (elem instanceof Array && elem.length === 0) {
        // console.log('return true - epmty array');
        return true;
    }
    if (elem instanceof Object && elem === {}) {
        // console.log('return true - empty object');
        return true;
    }
    if (elem == null || elem === null) {
        // console.log('return true - null ');
        return true;
    }

    // console.log('return false');
    return false;

}


app.listen(config.port, err => {
    if (err) throw err;
    console.log('Server listening on port ' + config.port);
});
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./uploads'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}));
app.use('/avatars',express.static('./uploads'))
app.use('/api',pages);
app.use('/api',settings);
app.use('/api', AddSocialWebs);
app.use('/api', DialogsRoute);
app.use('/api', smsru);
app.use('/api', authRoute);
app.use('/api', checkToken, userRoute);
app.use(errorHandler);
app.use(getUser);
app.use('/api', checkToken, pageRoute);


