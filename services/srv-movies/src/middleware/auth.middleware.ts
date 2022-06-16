import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/User/user.model";
import { UNAUTHORIZED_ERR } from "../utils/error-handler";
import { IRequestWithUser } from "../utils/types";

export async function validateAccessTokenAndAppendUserToReq(
  req: IRequestWithUser,
  _: Response,
  next: NextFunction
): Promise<void> {
  const { authorization } = req.headers;

  if (!authorization) return next(UNAUTHORIZED_ERR);

  try {
    const payload = jwt.verify(
      authorization,
      process.env.JWT_SECRET || "secret"
    ) as { userId: string };

    const { userId } = payload;
    const user = await User.findById(userId);

    if (!user) return next(UNAUTHORIZED_ERR);
    req.user = user;

    next();
  } catch (e) {
    next(UNAUTHORIZED_ERR);
  }
}
