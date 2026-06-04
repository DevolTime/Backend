import jwt from "jsonwebtoken";
const generaToken=(payload)=>{
try {
     const token = jwt.sign(payload, 'jijijij',{expiresIn:'1d'} )
     return token
} catch (error) {
      console.error(error);
    return null;
}
}


export  {generaToken}