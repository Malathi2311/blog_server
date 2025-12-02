import jwt from "jsonwebtoken";

const auth = (req, res, next)=>{
    const token = req.headers.authorization;

    try{
        jwt.verify(token, process.env.JWT_SECRET)
        next();
    }
    catch(error){
        res.json({success: false, message:"Invalid token"})
    }
}

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Invalid token" });
  }
};


export default auth;
