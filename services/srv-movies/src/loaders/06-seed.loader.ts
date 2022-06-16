import { ObjectId } from "mongodb";
import User from "../modules/User/user.model";

export default async function load(): Promise<void> {
  if (process.env.NODE_ENV === "test") return;
  const basic = await User.findOne({ role: "basic" });
  if (!basic) {
    await User.create({
      _id: new ObjectId("62ab032278fb06f9c26850be"),
      role: "basic",
      name: "Basic Thomas",
      username: "basic-thomas",
      password: "sR-_pcoow-27-6PAwCD8",
      movieCounters: 0,
    });
  }
  const premium = await User.findOne({ role: "premium" });
  if (!premium) {
    await User.create([
      {
        _id: new ObjectId("62ab032278fb06f9c26850c1"),
        role: "premium",
        name: "Premium Jim",
        username: "premium-jim",
        password: "GBLtTyq3E_UNjFnpo9m6",
        movieCounters: 0,
      },
    ]);
  }
}
