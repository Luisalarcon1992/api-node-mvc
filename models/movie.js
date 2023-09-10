import { randomUUID } from "node:crypto";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const movies = require("../movies.json");

export default class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const filtroGenero = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
      if (filtroGenero.length == 0) {
        return false;
      }
    }
    return movies;
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);

    if (movie === -1) return false;

    return movie;
  }

  static async setNewMovie({ body }) {
    const newMovie = {
      id: randomUUID(),
      ...body,
    };

    movies.push(newMovie);

    return newMovie;
  }

  static async deleteMovie({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);

    return true;
  }

  static async setParcialUpdateMovie({ id, data }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex == -1) return false;

    const movieUpdate = {
      ...movies[movieIndex],
      ...data,
    };

    movies[movieIndex] = movieUpdate;

    return movies[movieIndex];
  }
}
