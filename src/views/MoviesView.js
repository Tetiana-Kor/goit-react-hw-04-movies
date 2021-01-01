import { useState, useEffect } from 'react';
import {
  useHistory,
  useLocation,
  NavLink,
  useRouteMatch,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchBar from '../components/SearchBar';
import * as themoviedbAPI from '../service/themoviedb-api';
import styles from './Views.module.css';

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
        <ul className={styles.trendItem}>
          {movies.map(movie => (
            <li key={movie.id} className={styles.trendMovie}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width="320"
                className={styles.imageTrend}
              />
              <NavLink
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: { location } },
                }}
                className={styles.trendLink}
              >
                <p className={styles.title}>{movie.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
