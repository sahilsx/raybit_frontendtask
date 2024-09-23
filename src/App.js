import './App.css';
import Details from './components/ShowDetails';
import Expenses from './components/getexpenses';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Expenses />,
  },
  {
    path: '/details',
    element: <Details />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;



