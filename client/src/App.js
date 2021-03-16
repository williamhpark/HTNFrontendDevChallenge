import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
// Components
import Header from "./components/Header/Header";
// Pages
import EventListPage from "./pages/EventListPage/EventListPage";
import EventPage from "./pages/EventPage/EventPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
// Context
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/event/:id">
              {({ match }) => <EventPage match={match} />}
            </Route>
            <Route exact path="/">
              <EventListPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
