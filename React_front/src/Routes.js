import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const HomeLazy = lazy(() => import("./pages/Home/Home.jsx"));
const PlayerLazy = lazy(() => import("./pages/Player/Player.jsx"));
const TeamLazy = lazy(() => import("./pages/Team/Team.jsx"));
const LoginLazy = lazy(() => import("./pages/Login/Login.jsx"));
const RegisterLazy = lazy(() => import("./pages/Register/Register.jsx"));

function Routes() {
  return (
    <Router>
      <Switch>
        <Suspense fallback="loading">
          <Route exact path="/" component={HomeLazy} />
          <Route exact path="/player" component={PlayerLazy} />
          <Route exact path="/team" component={TeamLazy} />
          <Route exact path="/login" component={LoginLazy} />
          <Route exact path="/register" component={RegisterLazy} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default Routes;
