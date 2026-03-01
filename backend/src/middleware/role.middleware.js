
const allowOnly = (role) => {
    return (req,res,next) => {
        if(role !== req.user.role){
            const err = new Error("Not suited for the role")
            err.status = 403 
            return next(err)
        }
        next()
    }
}

export default allowOnly