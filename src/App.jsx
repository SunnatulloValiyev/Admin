import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import { Budgets, Login, Posts, RecurringBills, Register } from "./pages"
import Overview from "./pages/Oveverwiev/Overview"
import Transaction from "./pages/Transaction/Transaction"
import { ProtectedRoutes } from "./components"
import { useSelector } from "react-redux";

function App() {  
  const {user} = useSelector((store) => store.user);
  
  const routes = createBrowserRouter([
    {
      path: "/",
      element: 
      <ProtectedRoutes user={user}> 
        <MainLayout/>
      </ProtectedRoutes>, 
      children: [ 
        {
          index: true,
          element: <Overview />
        },
        {
          path: "/budgets",
          element: <Budgets />
        },
        {
          path: "/overview",
          element: <Overview />
        },
        {
          path: "/posts",
          element: <Posts/>
        },
        {
          path: "/recurringBills",
          element: <RecurringBills/>
        },
        {
          path: "/transaction", 
          element: <Transaction/>
        }
      ]
    },
    {
      path: "/login",
      element: user ? <Navigate to="/"/> : <Login />
    },
    {
      path: "/register",
      element: user ? <Navigate to="/"/> : <Register/>
    },
  ])

  return <RouterProvider router={routes}/>
}

export default App