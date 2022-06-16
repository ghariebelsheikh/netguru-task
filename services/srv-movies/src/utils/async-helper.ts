export async function runPromisesSequentially<T, K extends Function>(
  asyncFunctionsArray: K[],
  args: T
): Promise<void> {
  return asyncFunctionsArray.reduce(
    async (startPromise: Promise<any>, asyncFunction: K) =>
      startPromise.then(() => asyncFunction(args)),
    Promise.resolve()
  );
}
