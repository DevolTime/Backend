//DEFINICION GLOBAL DE ROLESD E USUARIO 


//retorna un objeto con todos los roles permitidos o podemos obtener solo uno de ellos 
export const ROLES = {
    ADMIN: 'administrador',
    EDITOR: 'editor',
    AUTHOR: 'author',
    SUBSCRIBER: 'subcriber'
}

//retorna una listado de los roles permitidos 
//estructura 
export const ROLE_LABELS ={
    [ROLES.ADMIN] : 'Administrador',
    [ROLES.EDITOR] : 'Editor',
    [ROLES.AUTHOR] : 'Autor',
    [ROLES.SUBSCRIBER] :'Subscriptor'

}

export const AllOWEB_ROLES = Object.values(ROLES);

// Definicion global de roles de usuario

// Retorta un objeto con todos los roles, permitidos o podemos obtener solo uno de ellos
export const PRODUCT_STATUS = {
    AVAIABLE: 'disponible',
    NOT_AVAIABLE: 'no disponible',
    REFURBISHED: 'refactorizado',
    PENDING: 'pendiente',
    SEND: 'enviado'
};


// Retorna el listado de los roles permitidos
export const ALLOWED_PRODUCT_STATUS = Object.values(PRODUCT_STATUS);
export const PRODUCT_STATUS_LABEL = {
    [PRODUCT_STATUS.AVAIABLE]: 'disponible',
    [PRODUCT_STATUS.NOT_AVAIABLE]: 'no disponible',
    [PRODUCT_STATUS.REFURBISHED]: 'refactorizado',
    [PRODUCT_STATUS.PENDING]: 'pendiente',
    [PRODUCT_STATUS.SEND]: 'enviado'
}
