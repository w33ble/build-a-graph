import monk from 'monk';

const db = monk('localhost/moviedb');

export const normalizeMovie = movie => ({ ...movie, genres: movie.genres.split(',') });

export default async (_, { id, title, year, limit = 10, skip = 0 }) => {
  const query = {};
  if (year) query.year = String(year);
  if (title) query.title = title;
  if (id) query.id = id;

  const docs = await db.get('movies').find(query, {
    limit: Math.min(limit, 20), // never more than 20
    skip,
  });

  if (docs.length === 0) return null;

  return docs.map(normalizeMovie);
};

export const people = async (movie, { limit, skip = 0, name, profession }) => {
  const matches = movie.people.filter(p => {
    const matchName = name ? p.name === name : true;
    const matchProfession = profession ? p.professions.includes(profession) : true;
    return matchName && matchProfession;
  });

  if (!limit && !skip) return matches;

  return matches.slice(skip, limit + skip || matches.length);
};
