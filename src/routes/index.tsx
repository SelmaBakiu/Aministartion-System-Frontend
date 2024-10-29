import storage from "../utils/storage.ts";
import {publicRoutes} from "./public.tsx";
import {useRoutes} from 'react-router-dom';
import {adminRoutes, employeeRoutes} from "./protected.tsx";

export const AppRoutes = () => {
  const loggedInUser = storage.getUser();

  const routes =
      loggedInUser && loggedInUser.user.role === "administrator" ? adminRoutes :
          loggedInUser && loggedInUser.user.role === "employee" ? employeeRoutes :
        [];

  const element = useRoutes([...routes, ...publicRoutes]);

  return <>{element}</>;
};
