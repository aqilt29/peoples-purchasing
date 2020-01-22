import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Pages/DashBoard';
import PageNotFound from './Pages/PageNotFound';
import PurchaseFormPage from './Pages/PurchaseFormPage';
import Unauthorized from './Pages/Unauthorized';
import LoginPage from './Pages/LoginPage'
//implement real authentication class in a little bit

import PrivateRoute from './utils/PrivateRoute';

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// const fakeAuth = { isAuthenticated: true };

class App extends React.Component {

  render() {
    return (
      <>
        <div>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/unauthorized" exact>
              <Unauthorized />
            </Route>
            <PrivateRoute path="/purchaseform" exact>
              <PurchaseFormPage/>
            </PrivateRoute>
            <PrivateRoute path="/" exact>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="*">
              <PageNotFound />
            </PrivateRoute>
          </Switch>
        </div>
      </>
    )
  }
};

export default App
