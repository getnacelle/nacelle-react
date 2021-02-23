import createStore from 'unistore';

export let actions = (store) => ({
  increment(state) {
    return { count: state.count + 1 };
  },
  decrement(state) {
    return { count: state.count - 1 };
  }
});

export default (initialState) => createStore(initialState);
