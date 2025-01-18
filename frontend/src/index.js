import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthPage from './pages/AuthPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthPage></AuthPage>
  </React.StrictMode>
);