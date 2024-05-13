import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root Page/Root";
import Dashboard from "./Components/Dashboard/Dashboard";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import Projects from "./Components/Projects/Projects";
import Inprocess from "./Components/Projects/Inprocess/Inprocess";
import Complete from "./Components/Projects/Complete/Complete";
import CreateProject from "./Components/CreateProject/CreateProject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
       path: "/projects",
       element: <Projects></Projects>,
       children: [
        {
          path: "/projects/inprocess",
          element: <Inprocess></Inprocess>
        },
        {
          path: "/projects/complete",
          element: <Complete></Complete>
        }
       ]
      },
      {
         path: '/createProject',
         element: <CreateProject></CreateProject> 
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
