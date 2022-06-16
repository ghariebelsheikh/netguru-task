import { Application } from "express";
import { runPromisesSequentially } from "../utils/async-helper";
import envLoader from "./01-env.loader";
import dbLoader from "./02-db.loader";
import expressLoader from "./03-express.loader";
import routesLoader from "./04-routes.loader";
import cronLoader from "./05-cron.loader";
import seedLoader from "./06-seed.loader";

export async function init(expressApp: Application): Promise<void> {
  runPromisesSequentially<Application, (app: Application) => Promise<void>>(
    [envLoader, dbLoader, expressLoader, routesLoader, cronLoader, seedLoader],
    expressApp
  );
}
