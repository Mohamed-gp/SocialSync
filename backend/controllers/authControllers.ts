import { Request, Response, NextFunction } from "express";

const register = (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({ message: "created succefuly" });
};
const login = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "login successfull    " });
};

export { register };
