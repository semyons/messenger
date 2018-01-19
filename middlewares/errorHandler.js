/**
 * Created by Semyon on 30.03.2017.
 */
export default function (err,req,res,next) {
    let {status= 500, message ='server error'} = err;
    return res
        .status(status)
        .json({ success:false,
                message:message,
                status:status
                });

}