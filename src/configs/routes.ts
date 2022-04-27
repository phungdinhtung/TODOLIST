import { ROUTES } from "../ultis/constants";
import Home from "../layouts/Home";
import { Route } from "../interfaces/commons";

export const routes: Route[] = [
  {
    path: ROUTES.HOME,
    name: "Login",
    component: Home,
    exact: true,
  },
];
