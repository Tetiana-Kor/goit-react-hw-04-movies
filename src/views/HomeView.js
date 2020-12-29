import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as themoviedbAPI from '../service/themoviedb-api';

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
          <h1>Trending today</h1>
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `${url}movies/${movie.id}`,
                    state: { from: { location } },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
