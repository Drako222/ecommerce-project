const filmtags = [
  { film_id: 1, tag_id: 1 },
  { film_id: 1, tag_id: 2 },
  { film_id: 1, tag_id: 3 },
  { film_id: 2, tag_id: 4 },
  { film_id: 2, tag_id: 5 },
  { film_id: 2, tag_id: 6 },
  { film_id: 3, tag_id: 7 },
  { film_id: 3, tag_id: 8 },
  { film_id: 4, tag_id: 9 },
  { film_id: 4, tag_id: 10 },
  { film_id: 4, tag_id: 11 },
];

exports.up = async (sql) => {
  await sql`
INSERT INTO films_tags ${sql(filmtags, 'film_id', 'tag_id')}
`;
};

exports.down = async (sql) => {
  for (const filmtag of filmtags) {
    await sql`
      DELETE FROM
        films_tags
      WHERE
        film_id=${filmtag.film_id} AND
				tag_id=${filmtag.tag_id}
  `;
  }
};
