//DEFINICION GLOBAL DE ROLESD E USUARIO 


//retorna un objeto con todos los roles permitidos o podemos obtener solo uno de ellos 
export const ROLES = {
    ADMIN :'administrador',
    EDITOR : 'editor',
    AUTHOR : 'author',
    SUBSCRIBER :'subcriber'
}

//retorna una listado de los roles permitidos 
export const AllOWEB_ROLES = Object.values(ROLES);