import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles } from './global-styles';
import App from './app';
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
);