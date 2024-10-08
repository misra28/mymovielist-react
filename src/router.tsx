import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import PersonDetailPage from "./pages/PersonDetailPage";
import UserMovieListPage from "./pages/UserMovieListPage";
import UserLoginPage from "./pages/UserLoginPage";
import UpdateListEntryPage from "./pages/UpdateListEntryPage";
import AddListEntryPage from "./pages/AddListEntryPage";
import UserRegisterPage from "./pages/UserRegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/register",
        element: <UserRegisterPage />,
      },
      {
        path: "/user",
        children: [
          {
            index: true,
            element: <UserLoginPage />,
          },
          {
            path: "list",
            element: <UserMovieListPage />,
          },
          {
            path: ":entry_id",
            element: <UpdateListEntryPage />,
          },
        ],
      },
      {
        path: "/movies",
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: ":movie_id",
            element: <MovieDetailPage />,
          },
        ],
      },
      {
        path: "/add",
        children: [
          {
            path: ":movie_id",
            element: <AddListEntryPage />,
          },
        ],
      },
      {
        path: "/people",
        children: [
          {
            path: ":person_id",
            element: <PersonDetailPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
