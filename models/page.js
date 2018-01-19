/**
 * Created by Semyon on 31.03.2017.
 */
import mongoose, {Schema} from 'mongoose';
const  PageSchema = new Schema({
    title:{type:String,require:true,unique:false},
    body:{type:String,require:true,unique:false},
    url:{type:String,unique:false},
    createdAt:{type:Date,require:true,unique:false},
    creator:{type:String,require:true,unique:false},
    creatorname:{type:String,require:true,unique:false},
    creatorType:{type:String,require:true,unique:false},
    creatorava:{type:String,default:'default.jpg',unique:false},
    like:[],
    type:{type:String,require:true,unique:false},
    commentcount:{type:Number,default:0,unique:false},
    createAtUnix:{type:Number}
});
export default mongoose.model('Page',PageSchema);