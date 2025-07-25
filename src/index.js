import React from 'react';
import ReactDOM from 'react-dom/client';

// CSS Styles
import './index.css';
import './Components/Loading/Loading.css';  
import './CSS/Components/button.css';
import './CSS/Components/alerts.css';
import './CSS/Components/google.css';
import './Pages/Auth/AuthOperations/Auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import CartChangerContext from './Context/CartChangerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <CartChangerContext>
          <Router>
            <App />
          </Router>
        </CartChangerContext>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);