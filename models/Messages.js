/**
 * Created by Semyon on 22.07.2017.
 */
import mongoose, { Schema } from 'mongoose';

const Messages= new Schema({
    date:{type:Date,default:Date.now()},
    dialogid:String,
    message:String,
    sender:String,
    reciver:String,
    timestamp:{type:Number}
});
export default mongoose.model('Messages', Messages);