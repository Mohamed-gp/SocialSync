import { Request, Response } from "express";
interface loginInterface {
  email: string;
  password: string;
}
interface registerInterface {
  username: string;
  email: string;
  password: string;
}
interface authRequest extends Request {
  user?: any;
}
interface ioResponse extends Response {
  io?: any;
}

export { loginInterface, registerInterface, authRequest, ioResponse };
