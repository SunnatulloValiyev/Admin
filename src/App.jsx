import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./layout/MainLayout";
import { Budgets, Login, Posts, RecurringBills, Register } from "./pages";
import Overview from "../src/pages/Oveverwiev/Overview";
import Transaction from "./pages/Transaction/Transaction";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const { user } = useSelector((state) => state.user);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: "budgets",
          element: <Budgets />,
        },
        {
          path: "overview",
          element: <Overview />,
        },
        {
          path: "posts",
          element: <Posts />,
        },
        {
          path: "recurringBills",
          element: <RecurringBills />,
        },
        {
          path: "transaction",
          element: <Transaction />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" replace /> : <Register />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;