import monk from 'monk';

const db = monk('localhost/moviedb');

export default async (_, { id, title, limit = 10, skip = 0 }) => {
  const query = {};
  if (title) query.title = title;
  if (id) query.id = id;

  const docs = await db.get('movies').find(query, {
    limit: Math.min(limit, 20), // never more than 20
    skip,
  });
  if (docs.length === 0) return null;
  return docs;
};
