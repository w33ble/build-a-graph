import echo from './echo.query';
import movies, { people as moviePeople } from './movies.query';
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
  Movie: {
    people: moviePeople,
  },
};
