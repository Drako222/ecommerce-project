export function getReducedFilmsWithTags(filmsWithTags) {
  const filmWith = {
    id: filmsWithTags[0].film_id,
    title: filmsWithTags[0].film_title,
    genre: filmsWithTags[0].film_genre,
    price: filmsWithTags[0].film_price,
    synopsis: filmsWithTags[0].film_synopsis,
    tags: filmsWithTags.map((film) => {
      return {
        id: film.tag_id,
        name: film.tag_name,
      };
    }),
  };
  return filmWith;
}
