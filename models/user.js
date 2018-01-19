/**
 * Created by Semyon on 30.03.2017.
 */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    ourtoken:{type:String,unique:false,default:0},
    login:{type:String, unique:true},
    email: {type:String,required:false},
    smscount:{type:Number,default:0},
    confirmed:{type:Number,default:0},
    lastname:{type:String},
    firstname:{type:String},
    avatar:{type:String,default:'default.jpg'},
    password: String,
    idvk:String,
    idfb:String,
    idinsta:String,
    idok:String,
    checkcode:String,
    online:Boolean,
    lastvisit:Number
});

UserSchema.pre('save',async function(next) {
if (!this.isModified('password')){
    return next();
}

const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(this.password, salt);

this.password = hash;
next();
});

UserSchema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password,this.password);
};

export default mongoose.model('User', UserSchema);
