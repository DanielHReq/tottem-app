import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import App from './App.js';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import MiscellaneousPage from './screens/MiscellaneousPage.js';
import BuPage from './screens/Bu.js';
import ImagemPage from './screens/Imagem.js';


/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);*/


const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      //errorElement: <ErrorScreen/>,
      children: [
            {
              path: "miscellaneous",
              element: <MiscellaneousPage />
            },
            {
              path: "bu",
              element: <BuPage />
            },              
            {
              path: "imagem",
              element: <ImagemPage />
            }

      ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();