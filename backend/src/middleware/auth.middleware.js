import jwt from "jsonwebtoken"

const protection =  (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] ;
        if(!token){
             const err = new Error("No token provided")
            err.status = 401
            return next(err)
        }

        try {
          const verify = jwt.verify(token,process.env.JWT_SECRET)
          req.user = verify ;
          next()
        } catch (error) {
            const err = new Error("Invalid or expired token")
            err.status = 401
            return next(err)
        }
        

    } catch (error) {
        return next(error)
    }
}

export default protection