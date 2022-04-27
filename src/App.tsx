import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes } from "./configs/routes";

import store from "./redux/_store";
import { Provider } from "react-redux";
import Loading from "./components/Commons/Loading";
import CommonAlert from "./components/Commons/CommonAlert";
import NotificationModal from "./components/Commons/NotificationModal";

const App: FC = () => {
  return (
    <Provider store={store}>
      <Loading />
      <NotificationModal />
      <CommonAlert />
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
