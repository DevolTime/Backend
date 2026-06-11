import jwt from "jsonwebtoken";
const generateToken=(payload)=>{
try {
     const token = jwt.sign(payload, 
          process.env.JWT_SEED,
          {expiresIn:'1d'} )
     return token
} catch (error) {
      console.error(error);
    return null;
}
}
const verifyToken= (token)=>{

try {
     const payload = jwt.verify(token, process.env.JWT_SEED)
     return payload
} catch (error) {
     console.error(error);
     return null
}


}

export  {generateToken, verifyToken}