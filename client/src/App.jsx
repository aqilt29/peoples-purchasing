import React from "react";
import { hot } from 'react-hot-loader/root';

import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./Components/PrivateRoute";
import Loading from "./Components/Loading";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer";
import Home from "./Views/Home";
import Dashboard from './Views/Dashboard';
import Profile from "./Views/Profile";
import PurchasingApps from './Views/PurchasingApps';
import PurchasingViewAll from './Views/PurchasingViewAll';
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import UserCreation from './Views/UserCreation';
import SearchPurchaseReqs from './Views/SearchPurchaseReqs'

// styles
import "./App.css";

// fontawesome
initFontAwesome();
import initFontAwesome from "./utils/initFontAwesome";
import UnderConstruction from "./Views/UnderConstruction";
import ManageVendors from "./Views/ManageVendors";
import Users from "./Views/Users";
import AdminRoute from "./Components/AdminRoute";
import UserList from "./Components/userComponents/UserList";
import PurchasingView from "./Views/PurchasingView";
import VendorApps from "./Views/VendorApps";
import AddVendors from "./Views/AddVendors";
import VendorListView from "./Views/VendorListView";
import VendorDetails from "./Views/VendorDetails";
import EditPurchaseReqDetails from './Views/EditPurchaseReqDetails';
import CreatePurchaseReq from "./Views/CreatePurchaseReq";
import PurchaseReqDetails from "./Views/PurchaseReqDetails";
import PurchasingAllByCompany from './Views/PurchasingAllByCompany'
import ItemDetailsPage from "./Views/ItemDetailsPage";
import PurchaseOrderApps from "./Views/PurchaseOrderApps";
import CreatePurchaseOrder from "./Views/CreatePurchaseOrder";
import AllPurchaseOrdersPage from "./Views/AllPurchaseOrdersPage";
import SearchAllPurchaseOrders from "./Views/SearchAllPuchaseOrders";
import PurchaseOrderDetails from "./Views/PurchaseOrderDetails";


const App = () => {
  const { loading, isAuthenticated, user, dbUser } = useAuth0();
  let MainPageView = Home;

  if (loading) {
    return <Loading />;
  }

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
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/users/viewall" component={UserList} />
            <PrivateRoute exact path="/users/create" component={UserCreation} />
            <PrivateRoute exact path="/purchaseorders" component={PurchaseOrderApps} />
            <PrivateRoute exact path="/purchaseorders/createpo" component={CreatePurchaseOrder} />
            <PrivateRoute exact path="/purchaseorders/allpos" component={AllPurchaseOrdersPage} />
            <PrivateRoute exact path="/purchaseorders/polookup" component={SearchAllPurchaseOrders} />
            <PrivateRoute exact path="/purchaseorders/details/:id" component={PurchaseOrderDetails} />
            <PrivateRoute exact path="/purchasing" component={PurchasingApps} />
            <PrivateRoute exact path="/purchasing/search" component={SearchPurchaseReqs} />
            <PrivateRoute exact path="/purchasing/view/:id/:approverId" component={PurchasingView} />
            <PrivateRoute exact path="/purchasing/view/:id" component={PurchasingView} />
            <PrivateRoute exact path="/purchasing/details/item/:itemId/:documentId" component={ItemDetailsPage} />
            <PrivateRoute exact path="/purchasing/details/:id" component={PurchaseReqDetails} />
            <PrivateRoute exact path="/purchasing/edit/:id" component={EditPurchaseReqDetails} />
            <PrivateRoute exact path="/purchasing/viewforms" component={PurchasingViewAll} />
            <PrivateRoute exact path="/purchasing/viewallrequests" component={PurchasingAllByCompany} />
            <PrivateRoute exact path="/purchasing/createform" render={(props) => <CreatePurchaseReq {...props} user={dbUser}/>} />
            <PrivateRoute exact path="/vendors" component={VendorApps} />
            <PrivateRoute exact path="/vendors/add" component={AddVendors} />
            <PrivateRoute exact path="/vendors/viewall" component={VendorListView} />
            <PrivateRoute exact path="/vendors/details/:id" component={VendorDetails} />
            <Route component={UnderConstruction}/>
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default hot(App);
