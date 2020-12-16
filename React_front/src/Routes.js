import React, { Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navigation } from "./components";
import { AuthContext } from "./contexts/AuthContext";

const HomeLazy = lazy(() => import("./pages/Home/Home.jsx"));
const PlayerLazy = lazy(() => import("./pages/Player/Player.jsx"));
const TeamLazy = lazy(() => import("./pages/Team/Team.jsx"));
const LoginLazy = lazy(() => import("./pages/Login/Login.jsx"));
const RegisterLazy = lazy(() => import("./pages/Register/Register.jsx"));

function Routes() {
  const auth = useContext(AuthContext);

  return (
    <Router>
      <Navigation loggedIn={!!auth.token} logout={() => auth.setToken("")} />
      <Switch>
        <Suspense fallback="loading">
          <Route exact path="/" component={PlayerLazy} />
          <Route exact path="/addbooks" component={TeamLazy} />
          <Route exact path="/login" component={LoginLazy} />
          <Route exact path="/register" component={RegisterLazy} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default Routes;
