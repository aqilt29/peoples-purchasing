import React from "react";
import { hot } from 'react-hot-loader/root';

import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./Components/PrivateRoute";
import Loading from "./Components/Loading";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Home from "./Views/Home";
import Dashboard from './Views/Dashboard';
import Profile from "./Views/Profile";
import Purchasing from './Views/Purchasing';
import PurchasingCreateForm from './Views/PurchasingCreateForm';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import UserCreation from './Views/UserCreation';

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import UnderConstruction from "./Views/UnderConstruction";
initFontAwesome();

const App = () => {
  const { loading, isAuthenticated, user, dbUser } = useAuth0();
  let mainPageView = Home;

  if (loading) {
    return <Loading />;
  }
  console.table(user)

  if (isAuthenticated) mainPageView = Dashboard;
  if (isAuthenticated && !dbUser) mainPageView = UserCreation;

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={mainPageView} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/purchasing" component={Purchasing} />
            <PrivateRoute exact path="/purchasing/vendorlist" component={Profile} />
            <PrivateRoute exact path="/purchasing/createform" component={PurchasingCreateForm} />
            <Route component={UnderConstruction}/>
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default hot(App);
