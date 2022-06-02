const films = [
  {
    id: '1',
    title: 'Unpredictable Nature',
    genre: 'Docummentary',
    synopsis: 'beautiful shots of America',
    price: '20',
  },
  {
    id: '2',
    title: 'Leon 2: Secret son',
    genre: 'Action',
    synopsis: "Jean Reno's son has to avenge his father",
    price: '30',
  },
  {
    id: '3',
    title: 'Alice and Friends',
    genre: 'Women Drama',
    synopsis: 'Four women are discussing  various forms of marriage',
    price: '15',
  },
  {
    id: '4',
    title: 'It 3: Game Over',
    genre: 'Horror Parody',
    synopsis: 'Parody of the famous horror adaptation',
    price: '24',
  },
];

exports.up = async (sql) => {
  await sql`
INSERT INTO films ${sql(films, 'title', 'genre', 'synopsis', 'price')}
 `;
};

exports.down = async (sql) => {
  for (const film of films) {
    await sql`
      DELETE FROM
        films
      WHERE
        title=${film.title} AND
        genre=${film.genre} AND
        synopsis=${film.synopsis}
  `;
  }
};
