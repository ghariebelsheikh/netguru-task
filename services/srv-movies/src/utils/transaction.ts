import mongoose from "mongoose";

// The session.withTransaction() helper handles:
// - Creating a transaction
// - Committing the transaction if it succeeds
// - Aborting the transaction if your operation throws
// - Retrying in the event of a transient transaction error.
export const withTransaction = async <T = any>(
  fn: (session: mongoose.ClientSession) => Promise<T>
): Promise<T | undefined> => {
  let result;
  const session = await mongoose.startSession();
  await session.withTransaction(async () => {
    result = await fn(session);
  });

  return result;
};
