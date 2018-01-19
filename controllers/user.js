/**
 * Created by Semyon on 31.03.2017.
 */
import * as UserService from '../services/UserService';

export async function getCurrentUser(req,res,next) {
    const {token} = req;
    try{
        var user = await UserService.getUserByToken(token);
    }catch ({message}){
        return next({
            status:500,
            message
        });
    }
    return res.json(user);
}