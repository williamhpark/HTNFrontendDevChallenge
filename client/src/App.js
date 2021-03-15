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
import { EventProvider } from "./context/EventContext";

const App = () => {
  return (
    <UserProvider>
      <EventProvider>
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
              <Route exact path="/:event">
                {({ match }) => <EventPage match={match} />}
              </Route>
              <Route exact path="/">
                <EventListPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </EventProvider>
    </UserProvider>
  );
};

export default App;
