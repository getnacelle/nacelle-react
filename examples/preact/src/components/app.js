import { h } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'unistore/preact';
import { store } from '../store/store';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Collections from '../routes/collections';
import Products from '../routes/products';

const App = () => (
  <Provider store={store}>
    <div id="app">
      <Header />
      <Router>
        <Home path="/" />
        <Collections path="/collections" handle={null} />
        <Collections path="/collections/:handle" />
        <Products path="/products" handle={null} />
        <Products path="/products/:handle" />
      </Router>
    </div>
  </Provider>
);

export default App;
