import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Landing, Error, Register, ProtectedRoute } from './pages';
import {
  Stats,
  Profile,
  AddJob,
  AllJobs,
  SharedLayout,
} from './pages/Dashboard';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <SharedLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Stats />,
      },
      {
        path: '/alljobs',
        element: <AllJobs />,
      },
      {
        path: '/addjob',
        element: <AddJob />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/landing',
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
]);

function App() {
  const { isDarkTheme } = useSelector((store) => store.user);
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
