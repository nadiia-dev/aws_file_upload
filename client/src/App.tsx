import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import Error from "./pages/Error";
import { UserProvider } from "./context/userContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      id: "root",
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <PublicRoute>
              <Register />
            </PublicRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
