import { Application, NextFunction, Request, Response } from "express";
import "../modules/Movie/movie.routes";
import { handleError, NOT_FOUND_ERR } from "../utils/error-handler";
import { AppRouter } from "../utils/router-instance";

const router = AppRouter.getInstance();

export default async function load(app: Application): Promise<void> {
  app.use("/api", router);

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(NOT_FOUND_ERR);
  });

  app.use(function (
    err: Error,
    _: Request,
    res: Response,
    __: NextFunction
  ): void {
    handleError(err, res);
  });
}
