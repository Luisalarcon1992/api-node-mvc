import z from "zod";

const movieSchema = z.object({
  title: z.string({
    required_error: "El título es requerido",
    invalid_type_error:
      "Tipo de dato incorrecto, se necesita una cadena de caracteres",
  }),
  year: z.number().int().min(1900).max(2030),
  director: z.string({
    required_error: "Nombre del director es requerido",
    invalid_type_error:
      "Tipo de dato incorrecto, se necesita una cadena de caracteres",
  }),
  duration: z.number().positive(),
  poster: z.string().url(),
  rate: z.number().min(0).max(10).default(5).default(0),
  genre: z.array(
    z.enum([
      "Drama",
      "Action",
      "Crime",
      "Adventure",
      "Sci-Fi",
      "Romance",
      "Biography",
      "Fantasy",
    ]),
    {
      required_error: "El género es requerido",
      invalid_type_error: "Solo puedes seleccionar los siguientes tipos",
    }
  ),
});

export function validarDatosMovie(object) {
  return movieSchema.safeParse(object);
}

export function validarMovieActualizar(object) {
  return movieSchema.partial().safeParse(object);
}
