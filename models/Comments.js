/**
 * Created by Semyon on 04.09.2017.
 */
import mongoose, { Schema } from 'mongoose';
const Comments = new Schema({
    creator:{type:String,require:true},
    name:{type:String,require:true},
    avatar:{type:String,require:true},
    date:{type:Date,require:true},
    message:{type:String,require:true},
    newsid:{type:String,require:true}
});
export default mongoose.model('Comments', Comments);
