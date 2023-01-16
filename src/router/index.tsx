import { createHashRouter } from 'react-router-dom';
import App from '../components/App';
import Boards from '../pages/Boards';
import Login from '../pages/Login';
import { loadUser } from '../utils/loaders/loadUser';
import ErrorPage from '../pages/Error';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'boards',
        element: <Boards />,
        loader: loadUser,
      },
    ],
  },
]);
