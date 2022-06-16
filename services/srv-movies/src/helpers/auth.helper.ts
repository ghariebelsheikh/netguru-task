import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

export const createAccessToken = async (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    {
      issuer: "https://www.netguru.com/",
      subject: userId,
      expiresIn: 30 * 60,
    }
  );
};
