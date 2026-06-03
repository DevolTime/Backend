import bcrpt, { hash, hashSync } from 'bcrypt'
const encrypedPassword = (originalPassword)=>{
    //genera una cadena aleatoria
const salt = bcrpt.genSaltSync(4);


// encripta la contraseña

const hashPassword = hashSync(
    originalPassword,
    salt
)
//encriptado listo pa registro
return hashPassword

}
export default encrypedPassword