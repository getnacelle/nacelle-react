import React, { useContext, useMemo, useReducer } from 'react';

const ADD_TO_CART = 'cart/add-to-cart';
const INCREMENT_ITEM = 'cart/increment-item';
const DECREMENT_ITEM = 'cart/decrement-item';
const REMOVE_FROM_CART = 'cart/remove-from-cart';
const TOGGLE_CART = 'cart/toggle-visibility';
const SET_CHECKOUT_STATUS = 'cart/set-status';
const CLEAR_CART = 'cart/clear';

const CartContext = React.createContext();
const CartActionContext = React.createContext();

const initialState = {
  cart: [],
  show: false,
  checkoutId: null,
  checkoutComplete: false
};

function isInCart(cart, payload) {
  return cart.findIndex((item) => item.id === payload.variant.id) > -1;
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: isInCart(state.cart, action.payload)
          ? state.cart
          : [...state.cart, { ...formatCartItem(action.payload) }]
      };
    case REMOVE_FROM_CART: {
      const payloadId = action.payload.variant
        ? action.payload.variant.id
        : action.payload.id;

      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payloadId)
      };
    }

    case INCREMENT_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) => {
          const payloadId = action.payload.variant
            ? action.payload.variant.id
            : action.payload.id;

          if (item.id === payloadId) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        })
      };
    case DECREMENT_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) => {
          const payloadId = action.payload.variant
            ? action.payload.variant.id
            : action.payload.id;

          if (item.id === payloadId) {
            return {
              ...item,
              quantity: item.quantity >= 1 ? item.quantity - 1 : item.quantity
            };
          }

          return item;
        })
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    case TOGGLE_CART:
      return {
        ...state,
        show: !state.show
      };
    case SET_CHECKOUT_STATUS: {
      return {
        ...state,
        checkoutId: action.payload.checkoutId,
        checkoutComplete: action.payload.checkoutComplete
      };
    }
    default:
      throw new Error('invalid action sent to cart reducer');
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const cartActions = useMemo(
    () => ({
      addToCart: setCartAction(dispatch, ADD_TO_CART),
      removeFromCart: setCartAction(dispatch, REMOVE_FROM_CART),
      incrementItem: setCartAction(dispatch, INCREMENT_ITEM),
      decrementItem: setCartAction(dispatch, DECREMENT_ITEM),
      toggleCart: setCartAction(dispatch, TOGGLE_CART),
      setCheckoutStatus: setCartAction(dispatch, SET_CHECKOUT_STATUS)
    }),
    []
  );

  return (
    <CartContext.Provider value={state}>
      <CartActionContext.Provider value={cartActions}>
        {children}
      </CartActionContext.Provider>
    </CartContext.Provider>
  );
};

function formatCartItem(item) {
  // TODO: Add validation for the format of the item
  const { title, vendor, tags, handle, id: productId } = item;
  const { featuredMedia: image, ...variant } = item.variant;

  return {
    ...variant,
    title,
    vendor,
    tags,
    handle,
    productId,
    image,
    quantity: item.quantity > 0 ? item.quantity : 1
  };
}

function setCartAction(dispatch, action) {
  return (payload = null) => {
    return dispatch({ type: action, payload });
  };
}

function useCartState() {
  const context = useContext(CartContext);
  return context;
}

function useCartActions() {
  const context = useContext(CartActionContext);
  return context;
}

const useCart = () => [useCartState(), useCartActions()];

export default useCart;
