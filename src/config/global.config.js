//DEFINICION GLOBAL DE ROLESD E USUARIO 


//retorna un objeto con todos los roles permitidos o podemos obtener solo uno de ellos 
export const ROLES = {
    ADMIN :'administrador',
    EDITOR : 'editor',
    AUTHOR : 'author',
    SUBSCRIBER :'subcriber'
}

//retorna una listado de los roles permitidos 
export const AllOWED_ROLES = Object.values(ROLES);
//estructura 
export const ROLE_LABELS ={
    [ROLES.ADMIN] : 'Administrador',
    [ROLES.EDITOR] : 'Editor',
    [ROLES.AUTHOR] : 'Autor',
    [ROLES.SUBSCRIBER] :'Subscriptor'

}