import { config } from 'dotenv-safe';
import postgres from 'postgres';
import { FilmfromDatabase, Props } from '../pages/films/[filmId]';

import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// copy  database.ts

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
