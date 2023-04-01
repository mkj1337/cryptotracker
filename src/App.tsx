import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// styles
import './styles.scss';

// components
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';

// pages
import { Home } from './pages/Home/Home';
import { SingleCoin } from './pages/SingleCoin/SingleCoin';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/coin/:coin',
        element: <SingleCoin />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
