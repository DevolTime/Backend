
const alloweRoles = ['administrador', 'editor', 'author', 'subcriber']

const autorizationUser = (alloweRoles = []) => {
    return (req, res, next) => {

        try {
            const { role } = req.payload // desestructuracaion llama el role con el {{ que esta en payload desde el res}}

            if (!role) {
                throw new Error('no tiene los permisos definidos ');

            }
            //paso 2 verificar si el rol de usuario esta en la lista de roles permitidos 

            if (!alloweRoles.includes(role)) {
                return res.status(403).json({
                    msg: `el rol${role}. no esta autorzado ppara esaa acciom`
                })
            }
            console.log(`El rol ${role} no esta autorizado para esta acción`);
            // paso 3qacceso a coNTROLADORE
            next();

        } catch (error) {


            if (error.message.includes('no tiene permisos definidos ')) {
                return console.status(404).json({
                    msg: error.message

                })
            }
            console.error(error);
            res.status(500).json({

                msg: "eeror en la autorizacion del servidor"

            })
        }
    }
}
export { autorizationUser }