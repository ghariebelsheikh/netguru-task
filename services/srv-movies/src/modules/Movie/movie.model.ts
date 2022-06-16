import { model, Schema } from "mongoose";

export interface IMovie {
  title: string;
  released: Date;
  genre: string;
  director: string;
}

const MovieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
    },
    released: {
      type: Date,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = model<IMovie>("Movie", MovieSchema);

export default Movie;
