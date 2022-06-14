exports.up = async (sql) => {
  await sql`
  CREATE TABLE films (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title varchar(50) NOT NULL,
    genre varchar(20) NOT NULL,
    synopsis varchar(300),
    price varchar(10) NOT NULL,
    tags varchar(10)
   )
 `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE films
  `;
};
