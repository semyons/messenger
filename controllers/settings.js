/**
 * Created by Anatola on 06.08.2017.
 */
import User from '../models/user';
import fs from 'fs';
export const setavatar = async(req,res,next)=> {
res.sendFile(req.file);
};