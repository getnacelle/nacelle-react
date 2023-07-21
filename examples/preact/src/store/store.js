import createStore from 'unistore';

export const store = createStore({
  showCart: false,
  lineItems: []
});

export let actions = (store) => ({
  flyoutCart(state) {
    let { showCart, ...rest } = state;
    return { showCart: true, ...rest };
  },
  toggleCart(state) {
    let { showCart, ...rest } = state;
    return { showCart: !showCart, ...rest };
  },
  addLineItem(state, payload) {
    let { lineItems, ...rest } = state;
    if (
      lineItems.find((lineItem) => lineItem.productId === payload.productId)
    ) {
      lineItems = lineItems.map((lineItem) => {
        if (lineItem.productId === payload.productId) {
          let { quantity, ...rest } = lineItem;
          return { quantity: quantity + payload.quantity, ...rest };
        } else {
          return lineItem;
        }
      });
      return { lineItems, ...rest };
    }
    lineItems = [...lineItems, payload];
    return { lineItems, ...rest };
  }
});
