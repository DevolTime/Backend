import bcrypt, { genSaltSync, hashSync, compareSync } from 'bcrypt'

const encryptedPassword = (Password) => {
    try {
        // 1- Generar una cadena aleatoria (salt)
        const salt = genSaltSync(5);
        const hashPassword = hashSync(Password, salt);
        return hashPassword;  // contraseña registrada lista para guardar

    } catch (error) {
        console.error(error);
        return null
    }
}

const validatePassword = (Password, hashPassword) => {
    try {
        const isValid = compareSync(Password, hashPassword)
        return isValid;
    } catch (error) {
        console.error(error);
        return null
    }
}

export { encryptedPassword, validatePassword }