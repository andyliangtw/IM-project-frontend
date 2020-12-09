import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ROUTES from './routes';
import './App.scss';

export default function App() {
  return (
    <Router>
      <Switch>
        <Container>
          <NavBar />
          {ROUTES.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(routeProps) => (
                <route.component routes={route.routes} {...routeProps} />
              )}
            />
          ))}
          <Footer />
        </Container>
      </Switch>
    </Router>
  );
}
