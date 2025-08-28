import jwt from "jsonwebtoken"
export const auth=(req,res,next) => {
    
    try{
      const accessToken=req.headers.authorization.replace("Bearer ","")
      const jwtPayload=jwt.verify(accessToken,process.env.jwt_salt) //return decoded payload data
       req.user=jwtPayload
  }catch(e){
    res.status(401).json({
        status:"failed",
        message:"Unauthorized"
    })
    return;
  }
  next()
}