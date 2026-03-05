const jwt= require("jsonwebtoken")

const verify_authentication= (req,res,next) => {
  const token= req.headers.authorization?.split(' ')[1]
  if(!token) res.status(401).json({message:"token is invalid"}); //header se token extraction if not there then simply discarded

  try{
    const verified_token= jwt.verify(token,process.env.JWT_SECRET) //verifying if the token has been altercated
    req.user=verified_token //populating request.user with verified_token
    next()
  }
  catch(err)
  {
    res.status(401).json({message:"invalid or expired token", error:err.message})
  }
}

module.exports= verify_authentication
