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

export const filmsDatabase = [
  {
    id: '1',
    title: 'Unpredictable Nature',
    genre: 'Docummentary',
    synopsis: 'beautiful shots of America',
    price: '20',
    tags: ['nature', 'wild', 'traveling', 'environment'],
  },
  {
    id: '2',
    title: 'Leon 2: Secret son',
    genre: 'Action',
    synopsis: "Jean Reno's son has to avenge his father",
    price: '30',
    tags: ['neonoir', 'gangster', 'godfather'],
  },
  {
    id: '3',
    title: 'Alice and Friends',
    genre: 'Women Drama',
    synopsis: 'Four women are discussing  various forms of marriage',
    price: '15',
    tags: ['female', 'social', 'friendship', 'family'],
  },
  {
    id: '4',
    title: 'It 3: Game Over',
    genre: 'Horror Parody',
    synopsis: 'Parody of the famous horror adaptation',
    price: '24',
    tags: ['stevenking', 'parody', '50s'],
  },
];
