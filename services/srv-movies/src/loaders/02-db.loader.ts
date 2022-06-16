import mongoose from "mongoose";
import * as Logger from "signale";

export default async function load(): Promise<void> {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.MongooseOptions;

  try {
    await mongoose.connect(process.env.MONGO_URL as string, options);
    Logger.success("Connected to Database successfully");
  } catch (e) {
    Logger.error("Error Connecting to Database");
    process.exit(0);
  }
}
