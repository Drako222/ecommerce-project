const films = [
  {
    id: '1',
    title: 'River',
    genre: 'Docummentary',
    synopsis:
      'A cinematic and musical odyssey that explores the remarkable relationship between humans and rivers.',
    price: '20',
  },
  {
    id: '2',
    title: 'Before the Flood',
    genre: 'Docummentary',
    synopsis:
      'A look at how climate change affects our environment and what society can do to prevent the demise of endangered species, ecosystems and native communities across the planet.',
    price: '30',
  },
  {
    id: '3',
    title: 'The Bubble',
    genre: 'Docummentary',
    synopsis:
      "The Bubble examines often-surreal senior citizen life within The Villages, America''s largest retirement community. Retired life beneath the Floridian sunshine however, is not perhaps as idyllic, or as welcomed, as one may imagine.",
    price: '15',
  },
  {
    id: '4',
    title: 'My Octopus Teacher',
    genre: 'Docummentary',
    synopsis:
      'A cinematic and musical odyssey that explores the remarkable relationship between humans and rivers.',
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
