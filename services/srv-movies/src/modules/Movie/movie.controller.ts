import { Request } from "express";
import { withTransaction } from "../../utils/transaction";
import { IRequestWithUser } from "../../utils/types";
import { getMovieByTitle } from "./movie.helper";
import Movie from "./movie.model";
import { MovieData, MovieDTO } from "./movie.types";

export async function getMovies(_: Request): Promise<MovieDTO[]> {
  return Movie.find({});
}

export async function addMovie(
  req: IRequestWithUser
): Promise<{ success: boolean }> {
  const { title } = req.body;
  const user = req.user;

  if (!user) throw new Error("User not found");

  if (user.role === "basic" && user.movieCounters === 5) {
    throw new Error("You can't add more movies");
  }

  await withTransaction(async (session) => {
    const data = await getMovieByTitle(title);
    const movieData: MovieData = (({ Title, Released, Director, Genre }) => ({
      Title,
      Released,
      Director,
      Genre,
    }))(data);
    const modifiedMovie = Object.fromEntries(
      Object.entries(movieData).map(([key, value]) => [
        key.toLowerCase(),
        value,
      ])
    );
    await Movie.create([modifiedMovie], { session });
    user.movieCounters++;

    await user.save({ session });
  });

  return {
    success: true,
  };
}
