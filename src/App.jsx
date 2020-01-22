import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./Components/PrivateRoute";
import Loading from "./Components/Loading";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Home from "./Views/Home";
import Dashboard from './Views/Dashboard';
import Profile from "./Views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading, isAuthenticated } = useAuth0();
  let mainPageView = Home;

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) mainPageView = Dashboard;

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={mainPageView} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
