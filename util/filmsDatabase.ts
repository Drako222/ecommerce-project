import { config } from 'dotenv-safe';
import postgres from 'postgres';
import { FilmfromDatabase, Props } from '../pages/films/[filmId]';

// import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

// setPostgresDefaultsOnHeroku();

config();

const sql = postgres();

// copy  database.ts

// Heroku needs SSL connections but
// has an "unauthorized" certificate
// https://devcenter.heroku.com/changelog-items/852

// const sql = postgres({ ssl: { rejectUnauthorized: false } });

// query
export async function getFilmsDatabase() {
  const films = await sql`
 SELECT * FROM films
`;
  return films;
}

// instead of [0] use [film]
export async function getFilm(id: number) {
  const [film] = await sql<FilmfromDatabase[]>`
   SELECT * FROM films
   WHERE id = ${id}`;
  return film;
}

export async function getFilmWithTagsById(filmId?: number) {
  if (!filmId) return undefined;
  const filmWithTags = await sql<[Props | undefined]>`
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
