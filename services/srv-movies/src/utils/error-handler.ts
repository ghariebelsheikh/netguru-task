import { NextFunction, Request, Response } from "express";
import * as Logger from "signale";
import { ErrorCode } from "./enum";
import { IRequestWithUser } from "./types";

export class CustomError extends Error {
  constructor(statusCode: number, code: ErrorCode, message: string) {
    super(message);
    Object.assign(this, {
      statusCode,
      code,
    });
  }
}

export const handleError = (
  error: any,
  res: Response,
  debug?: boolean
): Response => {
  const { message, code, statusCode, stack } = error;
  const status = statusCode || 500;

  Logger[status === 500 ? "error" : "info"](
    `Error in handling Request with Following Details: ${code} - ${message}`
  );

  if (debug) Logger.debug(stack);

  return res.status(status).json({
    code,
    message,
    success: false,
  });
};

export const asyncTryCatch =
  (
    handler: (
      req: IRequestWithUser,
      res?: Response,
      next?: NextFunction
    ) => Promise<any>
  ) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await handler(req, res);
      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  };

export const SERVER_ERR = new CustomError(
  500,
  ErrorCode.InternalServerError,
  "Error in Server while handling Request"
);
export const UNAUTHORIZED_ERR = new CustomError(
  401,
  ErrorCode.UnAuthorized,
  "You are not allowed to perform this action"
);

export const NOT_FOUND_ERR = new CustomError(
  404,
  ErrorCode.NotFound,
  "Resource Not Found"
);
