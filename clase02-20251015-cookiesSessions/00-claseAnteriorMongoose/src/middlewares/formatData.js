export const formatData=(req, res, next)=>{
    if(req.body.name) req.body.name=req.body.name.toUpperCase()

    next()
}