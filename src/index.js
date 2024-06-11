import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Home from './screens/Home.js';
import Item from './screens/Item.js';
import Pedidos from './screens/Pedidos.js';
import Pagamento from './screens/Pagamento.js';
import Confirmacao from './screens/Confirmacao.js';


/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Home />
);*/


const router = createBrowserRouter([
  {
      path: "/",
      element: <Home />,
      //errorElement: <ErrorScreen/>,
      children: [
          {
            path: "item",
            element: <Item />
          },              
          {
            path: "pedidos",
            element: <Pedidos />
          },              
          {
            path: "pagamento",
            element: <Pagamento />
          },              
          {
            path: "confirmacao",
            element: <Confirmacao />
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
