import { Application } from "express";
import { Server } from "http";
import { ObjectId } from "mongodb";
import request from "supertest";
import { startServer } from "../../app";
import { createAccessToken } from "../../helpers/auth.helper";
import Movie from "../../modules/Movie/movie.model";
import User, { IUser } from "../../modules/User/user.model";

const { getMovieByTitle } = jest.requireMock(
  "../../modules/Movie/movie.helper"
);

jest.mock("../../modules/Movie/movie.helper", () => ({
  getMovieByTitle: jest.fn(),
}));

describe("Create Movie", () => {
  const url = `/api/movies`;

  let app: Application;
  let server: Server;
  let userAccessToken: string;
  let user: IUser;

  beforeAll(async () => {
    await User.deleteMany({});
    await Movie.deleteMany({});
    ({ app, server } = await startServer());
    user = user = await User.create({
      _id: new ObjectId("62ab032278fb06f9c26850be"),
      role: "basic",
      name: "Basic Thomas",
      username: "basic-thomas",
      password: "sR-_pcoow-27-6PAwCD8",
      movieCounters: 0,
    });
    getMovieByTitle.mockImplementation(() => {
      return {
        Title: "Doctor Strange",
        Released: "2016-11-04T00:00:00.000Z",
        Director: "Scott Derrickson",
        Genre: "Action, Adventure, Fantasy",
      };
    });
    userAccessToken = await createAccessToken(String(user._id));
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Movie.deleteMany({});
  });

  test("Create Movie successfully", async () => {
    const { body, status } = await request(app)
      .post(url)
      .send({
        title: "Doctor Strange",
      })
      .set("Authorization", `${userAccessToken}`);

    expect(status).toEqual(200);

    const createdMovie = await Movie.findOne({});

    expect(createdMovie).toMatchObject({
      title: "Doctor Strange",
    });
  });
});
