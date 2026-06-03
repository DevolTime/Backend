import bcrypt, { genSaltSync, hashSync } from 'bcrypt'

const encryptedPassword = (Password) => {
    // 1- Generar una cadena aleatoria (salt)

    const salt = genSaltSync(5);

    const hashPassword = hashSync(Password, salt);

    return hashPassword;  // contraseña registrada lista para guardar
}

export { encryptedPassword }