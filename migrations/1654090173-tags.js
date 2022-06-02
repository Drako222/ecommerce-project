const allTags = [
  { name: 'nature' },
  { name: 'traveling' },
  { name: 'environment' },
  { name: 'neonoir' },
  { name: 'gangster' },
  { name: 'godfather' },
  { name: 'social' },
  { name: 'friendship' },
  { name: 'family' },
  { name: 'stevenking' },
  { name: 'parody' },
  { name: '50s' },
];

exports.up = async (sql) => {
  await sql`
INSERT INTO tags ${sql(allTags, 'name')}
`;
};

exports.down = async (sql) => {
  for (const tag of allTags) {
    await sql`
      DELETE FROM
        tags
      WHERE
        name=${tag.name}
  `;
  }
};
