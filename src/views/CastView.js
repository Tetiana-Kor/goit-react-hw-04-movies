import { useState, useEffect } from 'react';
import * as themoviedbAPI from '../service/themoviedb-api';
import noPhoto from '../components/nophoto.jpg';

export default function CastView({ moviesId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    themoviedbAPI.getCastMovie(moviesId).then(data => {
      if (data.cast.length === 0) {
        throw new Error('Is not avaliable');
      }
      setCast(data.cast);
    });
  }, [moviesId]);

  return (
    <div>
      {cast && (
        <ul>
          {cast.map(item => (
            <li key={item.id}>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${item.profile_path}`
                    : noPhoto
                }
                alt={item.name}
                width="150"
              />
              <p>{item.name}</p>
              <p>Character: {item.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
