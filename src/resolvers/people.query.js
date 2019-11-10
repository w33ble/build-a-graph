import monk from 'monk';
import { normalizeMovie } from './movies.query';

const db = monk('localhost/moviedb');

export default async (_, { id, name, birthYear, deathYear, limit = 10, skip = 0 }) => {
  const query = {};
  if (birthYear) query.birthYear = String(birthYear);
  if (deathYear) query.deathYear = String(deathYear);
  if (name) query.name = name;
  if (id) query.id = id;

  const docs = await db.get('people').find(query, {
    limit: Math.min(limit, 20), // never more than 20
    skip,
  });
  if (docs.length === 0) return null;
  return docs;
};

export const knownFor = async (person, { limit = 10, skip = 0 }) => {
  const docs = await db.get('movies').find(
    { id: { $in: person.knownFor } },
    {
      limit: Math.min(limit, 5), // never more than 5
      skip,
    }
  );
  return docs.map(normalizeMovie);
};
