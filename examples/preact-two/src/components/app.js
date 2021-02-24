import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Collections from '../routes/collections';
import Products from '../routes/products';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <Collections path="/collections" collection={null} />
      <Collections path="/collections/:collection" />
      <Products path="/products" product={null} />
      <Products path="/products/:product" />
    </Router>
  </div>
);

export default App;
