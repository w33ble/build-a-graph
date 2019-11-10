import echo from './echo.query';
import movies from './movies.query';
import people, { knownFor } from './people.query';

export default {
  Query: {
    echo,
    movies,
    people,
  },
  Person: {
    knownFor,
  },
};
