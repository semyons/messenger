/**
 * Created by Semyon on 01.05.2017.
 */
import request from 'request';
const https = require('https');
import parse from 'parse-json-response';
import net from 'net';
import url from 'url';
import qs from 'querystring';
export const vkapiget = async (req, res) => {
    request.post('https://api.vk.com/method/messages.send?peer_id=63049337&message=Привет&v=5.63');
    res.json('zaaasd');
};
export const vkapiGetLongPoll = async(req,res)=>{
    const clienttokenvk='720c6c5e2bff13cee1cb4c1197f2d4b7d7589cba6c920a942c64b58886a1f50e53d18b2c36cf605fddff4';
    https.get('https://api.vk.com/method/messages.getLongPollServer?access_token='+clienttokenvk+'&need_pts=1',  parse(function(er,data) {
        res.send(data.response);
    }));
};
export const vkapiGetHistory = async(req,res)=>{
    const clienttokenvk = req.body.vktoken;
    const friendidvk =req.body.friendidvk;
    https.get('https://api.vk.com/method/messages.getHistory?access_token='+clienttokenvk+'&user_id='+friendidvk+'&offset=0&',  parse(function(er,data) {
        let kekus = data.response;
        kekus.forEach(function (el,i,arr) {
            if (typeof(arr[i])!='object'){
                kekus.splice(i,1);
            }
        });
        res.send(kekus);
    }));
};

export const vkapiStartLongPoll = async(req,res)=>{
    const key ='574e2f4da375b05ae7c43cd5e8246589b4344418';
    const server ='imv4.vk.com\/im2308';
    const ts='1832246197';
    const pts ='10193396';

    res.json('https://'+server+'?act=a_check&key='+key+'&ts='+ts+'&wait=25&mode=2&version=2', parse(function(er,data) {
    res.send(data.response);
    vkapiStartLongPoll();
    }));
};

export const vkapiSendMessage = async (req, res, next) => {
    const clienttokenvk = req.body.vktoken;
    const friendidvk = req.body.friendidvk;
    let message = req.body.message;
    message = qs.escape(message);
    message = message.toString("utf-8");
    let toconvert =('https://api.vk.com/method/messages.send?user_id='+friendidvk+'&message='+message+'&access_token='+clienttokenvk) ;
    https.get(toconvert.toString("utf-8"));
    res.json('Message was successfully sended');

};