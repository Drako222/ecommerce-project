import { totalCounting } from '../functions.js';

test('reduces films with tags', () => {
  const cookie = [
    {
      film_id: 2,
      film_title: 'Leon 2: Secret son',
      tag_id: 4,
      tag_name: 'neonoir',
      film_synopsis: "Jean Reno's son has to avenge his father",
      film_genre: 'Action',
      film_price: '30',
    },
    {
      film_id: 2,
      film_title: 'Leon 2: Secret son',
      tag_id: 5,
      tag_name: 'gangster',
      film_synopsis: "Jean Reno's son has to avenge his father",
      film_genre: 'Action',
      film_price: '30',
    },
  ];
  expect(getReducedFilmsWithTags(cookie)).toStrictEqual({
    id: 2,
    title: 'Leon 2: Secret son',
    genre: 'Action',
    price: '30',
    synopsis: "Jean Reno's son has to avenge his father",
    tags: [
      { id: 4, name: 'neonoir' },
      { id: 5, name: 'gangster' },
    ],
  });

  expect(getReducedFilmsWithTags(cookie)).toMatchSnapshot();
});
