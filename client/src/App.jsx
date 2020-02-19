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
import PurchasingApps from './Views/PurchasingApps';
import PurchasingViewAll from './Views/PurchasingViewAll';
import PurchasingCreateForm from './Views/PurchasingCreateForm';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import UserCreation from './Views/UserCreation';

// styles
import "./App.css";

// fontawesome
initFontAwesome();
import initFontAwesome from "./utils/initFontAwesome";
import UnderConstruction from "./Views/UnderConstruction";
import ManageVendors from "./Views/ManageVendors";
import Users from "./Views/Users";
import AdminRoute from "./Components/AdminRoute";
import UserList from "./Components/UserList";
import PurchasingView from "./Views/PurchasingView";
import VendorApps from "./Views/VendorApps";
import AddVendors from "./Views/AddVendors";

const App = () => {
  const { loading, isAuthenticated, user, dbUser } = useAuth0();
  let MainPageView = Home;

  if (loading) {
    return <Loading />;
  }
  console.table(user)

  if (isAuthenticated) MainPageView = Dashboard;
  if (isAuthenticated && !dbUser) MainPageView = UnderConstruction;

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact render={(props) => <MainPageView {...props} user={user} />} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <AdminRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/users/viewall" component={UserList} />
            <PrivateRoute exact path="/users/create" component={UserCreation} />
            <PrivateRoute exact path="/purchasing" component={PurchasingApps} />
            <PrivateRoute exact path="/purchasing/view/:id/:approverId" component={PurchasingView} />
            <PrivateRoute exact path="/purchasing/view/:id" component={PurchasingView} />
            <PrivateRoute exact path="/purchasing/viewforms" component={PurchasingViewAll} />
            <PrivateRoute exact path="/purchasing/vendors" component={VendorApps} />
            <PrivateRoute exact path="/purchasing/vendors/add" component={AddVendors} />
            <PrivateRoute exact path="/purchasing/vendors/viewall" component={UnderConstruction} />
            <PrivateRoute exact path="/purchasing/createform" render={(props) => <PurchasingCreateForm {...props} user={dbUser}/>} />
            <Route component={UnderConstruction}/>
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default hot(App);
