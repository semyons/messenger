/**
 * Created by Semyon on 30.03.2017.
 */
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';

export const signup = async (req, res, next) => {
    let currentthing = req.body.login.replace(/\D+/g,"");
    console.log(currentthing.length);
    if(currentthing.length === 11){
    let credentials = {
        password: req.body.password,
        login:currentthing,
        email:req.body.email,
        };
    let user;
    User.findOne({login:req.body.login},async function (err,userx) {
        console.log(userx);
    if (!userx){
        try {
            user = await User.create(credentials);
        }catch ({message}){
            return next({
                success:false,
                status:400,
                message:message
            });
        }
        res.json({
            success:true,
            login:user.login,
        });
    }else{if(userx.confirmed !== 1){
        userx.login = credentials.login;
        userx.password=credentials.password;
        userx.email=credentials.email;
        userx.save();
        res.json({
           success:true,
            login:userx.login,
            message:'user was successfully rewrited'
        });
    }else{
        res.json({
            success:false,
            status:400,
            message:'this username was already validated'
        });
    }
    }

})}else{
        res.json({
            success:false,
            message:'your login should have 11 nums'
        })
    }};
export const signin = async (req, res, next) => {
    const login = req.body.login,
            password = req.body.password;
    await User.findOne({login:login}, async function (err,user) {
        if (!user){
            return res.json({
                success:false,
                status:400,
                message:'user not found'
            });
        }else{
        try {
            var result = await user.comparePasswords(password);
        }catch (e){
            return res.json({
                success:false,
                status:400,
                message:'Bad Credentials'
            });
        }
        if(result == false){
            res.json({
                success:false,
                status:400,
                message:'wrong login or password'
            });}else{
            console.log(user.ourtoken);
        if (user.ourtoken !== '0'){
            res.json({
                success:true,
                login:user.login,
                token:user.ourtoken
            });}else{
            const token = jwt.sign({_id: login}, config.secret);
            user.ourtoken=token;
            console.log(user);
            user.save();
            res.json({
                success:true,
                token:user.ourtoken,
                login:user.login
            })
        }}
        }});


};
