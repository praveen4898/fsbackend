const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1]
if(token){
    const decoded=jwt.verify(token,"masai")
    if(decoded){
       req.body.userID=decoded.userID
       req.body.author=decoded.author
        next()
    }
    else{
        res.send({"msg":"not authorised"})
    }
}
else{
    res.send({"msg":"not authorised"})
}
}


module.exports={
    auth
}