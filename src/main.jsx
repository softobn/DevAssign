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
import Developer from "./Components/Developer/Developer";
import ProjectTaskPage from "./Components/ProjectTaskPage/ProjectTaskPage";
import AddTaskPage from "./Components/ProjectTaskPage/AddTaskPage";
import CreateSubTask from "./Components/ProjectTaskPage/CreateSubTask";
import UpdateTaskPage from "./Components/ProjectTaskPage/UpdateTaskPage";
import UpdateSubTaskPage from "./Components/ProjectTaskPage/UpdateSubTaskPage";
import Privat from "./Components/Privat/Privat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },

      {
        path: "/developer",
        element: <Privat><Developer></Developer></Privat>,
      },

      {
        path: "/projects",
        element: <Privat><Projects></Projects></Privat>,
        children: [
          {
            path: "/projects/inprocess",
            element: <Privat><Inprocess></Inprocess></Privat>,
          },
          {
            path: "/projects/complete",
            element: <Privat><Complete></Complete></Privat>,
          },
        ],
      },
      {
        path: "/tasks/:id",
        element: <Privat><ProjectTaskPage /></Privat>,
      },

      {
        path: "/updateTask",
        element: <Privat><UpdateTaskPage></UpdateTaskPage></Privat>,
      },
      {
        path: "/addTask",
        element: <Privat><AddTaskPage></AddTaskPage></Privat>,
      },
      {
        path: "/updateTask/:id",
        element: <Privat><UpdateTaskPage></UpdateTaskPage></Privat>,
        loader: ({ params }) =>
          fetch(
            `https://softobn.pythonanywhere.com/api/user/task-list/?project_id=${params.id}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "content-type": "application/json",
              },
            }
          ),
      },
      {
        path: "/createSubtasks",
        element: <Privat><CreateSubTask></CreateSubTask></Privat>,
      },
      {
        path: "/updateSubTask",
        element:<Privat><UpdateSubTaskPage></UpdateSubTaskPage></Privat>,
      },

      {
        path: "/createProject",
        element: <Privat><CreateProject></CreateProject></Privat>,
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
