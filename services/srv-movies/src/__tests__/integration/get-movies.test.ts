import { Application } from "express";
import { Server } from "http";
import { ObjectId } from "mongodb";
import request from "supertest";
import { startServer } from "../../app";
import { createAccessToken } from "../../helpers/auth.helper";
import Movie, { IMovie } from "../../modules/Movie/movie.model";
import User, { IUser } from "../../modules/User/user.model";

describe("Get Movies", () => {
  const url = "/api/movies";

  let app: Application;
  let server: Server;
  let user: IUser;
  let movie: IMovie;
  let userAccessToken: string;

  beforeAll(async () => {
    await User.deleteMany({});
    await Movie.deleteMany({});
    ({ app, server } = await startServer());
    user = await User.create({
      _id: new ObjectId("62ab032278fb06f9c26850be"),
      role: "basic",
      name: "Basic Thomas",
      username: "basic-thomas",
      password: "sR-_pcoow-27-6PAwCD8",
      movieCounters: 0,
    });
    movie = await Movie.create({
      title: "Doctor Strange",
      released: new Date("2016-10-04T00:00:00.000Z").toISOString(),
      genre: "Adventure",
      director: "sam raimi",
    });
    userAccessToken = await createAccessToken(String(user._id));
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Movie.deleteMany({});
  });

  it("should return all movies", async () => {
    const { body, status } = await request(app)
      .get(url)
      .set("Authorization", `${userAccessToken}`);
    expect(status).toEqual(200);
  });
});
