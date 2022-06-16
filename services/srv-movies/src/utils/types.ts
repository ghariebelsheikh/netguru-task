import { Request } from "express";
import { IUser } from "../modules/User/user.model";
export interface IRequestWithUser extends Request {
  user?: IUser;
}
