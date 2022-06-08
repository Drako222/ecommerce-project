exports.up = async (sql) => {
  await sql`
  CREATE TABLE films_tags (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    film_id integer REFERENCEs films (id),
		tag_id integer REFERENCEs tags (id),
		UNIQUE (film_id, tag_id)
   )
 `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE films_tags
  `;
};
