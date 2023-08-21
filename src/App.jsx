import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/main";
import Dashboard from "./pages/Dashboard";
import Governance from "./pages/Governance";
import LaunchToken from "./pages/LaunchToken";
import Stake from "./pages/Stake";
import Locker from "./pages/Locker";
import Manager from "./pages/Manager";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/stake", element: <Stake /> },
        { path: "/launchToken", element: <LaunchToken /> },
        { path: "/locker", element: <Locker /> },
        { path: "/manager", element: <Manager /> },
        {
          path: "/governance",
          element: <Governance />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
