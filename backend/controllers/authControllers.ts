import { Request ,Response , NextFunction } from "express"


const registerController = (req : Request,res : Response,next : NextFunction) => {
    res.status(201).json({message : "created succefuly"})
}



export {registerController}