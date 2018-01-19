/**
 * Created by Semyon on 28.07.2017.
 */
import User from '../models/user';

export const addsocialweb = async(req,res,next)=> {
try{
    User.findOne({ourtoken:req.headers.ourtoken},async function (err,user) {
        if (user){
            console.log(user);
            if(req.body.idvk){user.idvk=req.body.idvk;}
            if(req.body.idok){user.idok=req.body.idok;}
            if(req.body.idfb){user.idfb=req.body.idfb;}
            if(req.body.idinsta){user.idinsta=req.body.idinsta;}
            user.save();
            res.json(
                user
            );
        }else{
            res.json({
                success:false,
                status:400,
                message:'Cant find user with this token. Check your token'
            });
        }
        
    });
}catch (err){
    res.json({
        success:false,
        message:'some error while adding social web'
    });
}
};
