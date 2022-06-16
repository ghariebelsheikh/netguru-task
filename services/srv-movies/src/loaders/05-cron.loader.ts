import schedule from "node-schedule";
import User from "../modules/User/user.model";

export default async function load(): Promise<void> {
  // Run the job every month to reset the user's monthly counters
  // For simulation purposes, we will run it every minute
  const job1 = schedule.scheduleJob("*/1 * * * *", async () => {
    return User.updateMany(
      {
        "role.name": "basic",
      },
      {
        $set: {
          counters: 0,
        },
      }
    );
  });

  process.on("exit", () => [job1].map((job) => job.cancel()));
}
