const allTags = [
  { name: 'environment' },
  { name: 'water' },
  { name: 'drones' },
  { name: 'globalwarming' },
  { name: 'dicaprio' },
  { name: 'world' },
  { name: 'seniors' },
  { name: 'america' },
  { name: 'lifestyle' },
  { name: 'ocean' },
  { name: 'friendship' },
  { name: 'diving' },
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
