import Cookies from 'js-cookie';
import { FilmInOrder } from '../pages/films/[filmId]';

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) {
    return undefined;
  }
  try {
    return JSON.parse(cookieValue);
  } catch (err) {
    return undefined;
  }
}

type FilmInOrder = {
  id: string;
  filmCounter: number;
}[];

export function setStringifiedCookie(key: string, value: FilmInOrder) {
  Cookies.set(key, JSON.stringify(value));
}
