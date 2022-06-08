import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres();

// query
export async function getFilmsDatabase() {
  const films = await sql`
 SELECT * FROM films
`;
  return films;
}

// instead of [0] use [film]
export async function getFilm(id) {
  const [film] = await sql`
   SELECT * FROM films
   WHERE id = ${id}`;
  return film;
}

export async function getFilmWithTagsById(filmId) {
  const filmWithTags = await sql`
  SELECT
    films.id AS film_id,
    films.title AS film_title,
    tags.id AS tag_id,
    tags.name AS tag_name,
    films.synopsis AS film_synopsis,
    films.genre AS film_genre,
    films.price AS film_price
  FROM
    films,
    films_tags,
    tags
    WHERE
      films.id = ${filmId} AND
      films_tags.film_id = films.id AND
      tags.id = films_tags.tag_id
  `;
  return filmWithTags;
}
