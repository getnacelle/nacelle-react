import { h, render } from 'preact';
import { Provider } from 'unistore/preact';
import Router from './router';

import createStore from './store/store';

const store = createStore(window.__STATE__);

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  app,
  app.lastChild
);
