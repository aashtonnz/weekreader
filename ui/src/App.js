import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./state/store";
import { setUser, setConfig } from "./state/actions";
import setAuthToken from "./utils/setAuthToken";
import Root from "./views/Root";
import ErrorBoundary from "./views/ErrorBoundary";
import PrivateRoute from "./views/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Inbox from "./pages/Inbox";
import Bookmarked from "./pages/Bookmarked";
import Hidden from "./pages/Hidden";
import User from "./pages/User";
import EditSub from "./pages/EditSub";
import NotFound from "./pages/NotFound";
import Confirm from "./pages/Confirm";
import Unsubscribe from "./pages/Unsubscribe";
import ResetPasswordEmail from "./pages/ResetPasswordEmail";
import ResetPassword from "./pages/ResetPassword";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(setUser());
    store.dispatch(setConfig());
  }, []);

  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <Router>
          <Root>
            <Switch>
              <Route exact path="/" component={Inbox} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/reset-password-email"
                component={ResetPasswordEmail}
              />
              <Route
                exact
                path="/reset-password/:token"
                component={ResetPassword}
              />
              <Route exact path="/confirm/:token" component={Confirm} />
              <Route exact path="/unsubscribe/:token" component={Unsubscribe} />
              <PrivateRoute exact path="/bookmarked" component={Bookmarked} />
              <PrivateRoute exact path="/hidden" component={Hidden} />
              <PrivateRoute exact path="/edit-sub/:id" component={EditSub} />
              <PrivateRoute exact path="/user" component={User} />
              <Route component={NotFound} />
            </Switch>
          </Root>
        </Router>
      </ReduxProvider>
    </ErrorBoundary>
  );
}

export default App;
