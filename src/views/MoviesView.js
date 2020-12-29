import { useState, useEffect } from 'react';
import {
  useHistory,
  useLocation,
  NavLink,
  useRouteMatch,
} from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import * as themoviedbAPI from '../service/themoviedb-api';

export default function MoviesView() {
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const { url } = useRouteMatch();
  const [error, setError] = useState();

  const searchQuery = new URLSearchParams(location.search).get('query') ?? '';

  const onChangeSearchQuery = query => {
    history.push({ ...location, search: `query=${query}` });
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    themoviedbAPI
      .getSearchMovie(searchQuery)
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => setError(error));
  }, [searchQuery]);

  return (
    <>
      <SearchBar onSubmit={onChangeSearchQuery} />

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <NavLink
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: { location } },
                }}
              >
                {movie.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
