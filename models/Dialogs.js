/**
 * Created by Semyon on 22.07.2017.
 */
import mongoose, { Schema } from 'mongoose';
const Dialogs = new Schema({
    firstguy:{type:String,required:true},
    secondguy:{type:String,requied:true},
    updated:{type:Date,default:Date.now()},
    lastmessage:{type:String,default:'There are no messages yet',requied:true}
});
export default mongoose.model('Dialogs', Dialogs);