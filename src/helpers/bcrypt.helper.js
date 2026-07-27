import bcrpt, { hash, hashSync, compareSync } from 'bcrypt'
const encrypedPassword = (originalPassword) => {
    try {
        const salt = bcrpt.genSaltSync(4);

        // encripta la contraseña

        const hashPassword = hashSync(
            originalPassword,
            salt
        )
        //encriptado listo pa registro
        return hashPassword
    }
    catch (error) {
        console.error(error);

        return null;
    }
}
//genera una cadena aleatoria


const validatePassword = (originalPassword, hashPassword) => {
    try {
        const isValid = compareSync(originalPassword, hashPassword)

        return isValid
    } catch (error) {
        console.error(error);
        return null;

    }
}
export {
    encrypedPassword,
    validatePassword
}