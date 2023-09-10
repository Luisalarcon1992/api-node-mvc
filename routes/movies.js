import { Router } from "express";
import MovieController from "../controllers/movies.js";

export const moviesRouter = Router();

moviesRouter.get("/", MovieController.getAll);
moviesRouter.get("/:id", MovieController.getById);
moviesRouter.post("/movies", MovieController.setNewMovie);
moviesRouter.delete("/:id", MovieController.deleteMovie);
moviesRouter.patch("/:id", MovieController.setParcialMovie);
