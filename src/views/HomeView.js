import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as themoviedbAPI from '../service/themoviedb-api';
import styles from './Views.module.css';

export default function HomeView() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [error, setError] = useState();

  useEffect(() => {
    themoviedbAPI
      .getTrendingMovies()
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => setError(error));
  }, []);

  return (
    <>
      {movies && (
        <>
          <h1 className={styles.trendToday}>Trending today</h1>
          <ul className={styles.trendItem}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.trendMovie}>
                <Link
                  to={{
                    pathname: `${url}movies/${movie.id}`,
                    state: { from: { location } },
                  }}
                  className={styles.trendLink}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    width="320"
                    className={styles.imageTrend}
                  />
                  <p className={styles.title}>{movie.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
