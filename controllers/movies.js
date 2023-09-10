import MovieModel from "../models/movie.js";
import { validarDatosMovie, validarMovieActualizar } from "../schema/movie.js";

export default class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    if (!movies) {
      return res.status(404).json({ message: "No se encontró el género" });
    }
    res.json(movies);
  }

  static async getById(req, res) {
    const { id } = req.params;

    const movie = await MovieModel.getById({ id });
    if (!movie) {
      res.status(404).json({ mensaje: "No se encontró la película" });
    }

    return res.json(movie);
  }

  static async setNewMovie(req, res) {
    const result = validarDatosMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await MovieModel.setNewMovie({ body: result.data });

    res.status(201).json(newMovie);
  }

  static async deleteMovie(req, res) {
    const { id } = req.params;

    const deleted = await MovieModel.deleteMovie({ id });
    if (!deleted) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ message: "Movie deleted" });
  }

  static async setParcialMovie(req, res) {
    const result = validarMovieActualizar(req.body); //validaciones

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) }); //validaciones
    }

    const { id } = req.params;

    const updateSuccess = await MovieModel.setParcialUpdateMovie({
      id,
      data: result.data,
    });

    if (!updateSuccess) {
      return res.status(400).json({ mensaje: "No se encontró la pelicula" });
    } //validaciones

    res.json(updateSuccess);
  }
}
