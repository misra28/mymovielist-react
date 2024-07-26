import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import PersonDetailPage from "./pages/PersonDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
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
