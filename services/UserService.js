/**
 * Created by Semyon on 31.03.2017.
 */
import User from '../models/user';

export async function getUserByToken(token){
    let usera;
try {
     usera = await User.findOne({ ourtoken:token });
}catch (e){
    throw e;
}
console.log('EBAAAAAT YA TUT');
console.log(usera);
return usera;
}
