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
const verifyToken= (token)=>{

try {
     const playload = jwt.verify(token, 'jijijij')
     return playload
} catch (error) {
     console.error(error);
     return null
}


}

export  {generaToken, verifyToken}