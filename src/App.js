import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import styles from './App.css';
import Container from './components/Container';

const AppBar = lazy(() =>
  import('./components/AppBar' /* webpackChunkName: "app-bar" */),
);

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "home-view" */),
);

const MoviesView = lazy(() =>
  import('./views/MoviesView' /* webpackChunkName: "mvies-view" */),
);

const HomeSubView = lazy(() =>
  import('./views/HomeSubView' /* webpackChunkName: "home-sub-view" */),
);

const NotFoundView = lazy(() =>
  import('./views/NotFoundView' /* webpackChunkName: "not-found-view" */),
);

function App() {
  return (
    <Container>
      <Suspense
        fallback={
          <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
            className={styles.loader}
          />
        }
      >
        <AppBar />

        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:moviesId">
            <HomeSubView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer autoClose={3000} />
    </Container>
  );
}

export default App;
