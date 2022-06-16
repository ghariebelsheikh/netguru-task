import axios from "axios";

export const getMovieByTitle = async (title: string) => {
  const { data } = await axios.get(
    `http://www.omdbapi.com/?i=tt3896198&apikey=f716b08d&t=${title}`
  );

  return data;
};
