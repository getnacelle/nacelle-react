import React, { useEffect, useReducer } from 'react';

export const EventLogContext = React.createContext();

const eventReducer = (state, action) => {
  if (
    action.type === 'PAGE_VIEW' ||
    action.type === 'PRODUCT_VIEW' ||
    action.type === 'ADD_TO_CART' ||
    action.type === 'REMOVE_FROM_CART' ||
    action.type === 'CHECKOUT_INIT'
  ) {
    return [...state, action];
  }
  return state;
};

export const EventDispatcherProvider = ({ children }) => {
  const [eventLog, dispatchEvent] = useReducer(eventReducer, []);

  useEffect(() => {
    if (eventLog.length > 0 && process.browser) {
      const event = eventLog.pop();
      switch (event.type) {
        case 'PAGE_VIEW':
          console.log('PAGE VIEW EVENT FIRED');
          break;
        case 'PRODUCT_VIEW':
          console.log('PRODUCT_VIEW EVENT FIRED', event.payload);
          break;
        case 'ADD_TO_CART':
          console.log('ADD_TO_CART EVENT FIRED', event.payload);
          break;
        case 'REMOVE_FROM_CART':
          console.log('REMOVE_FROM_CART EVENT FIRED', event.payload);
          break;
        case 'CHECKOUT_INIT':
          console.log('CHECKOUT_INIT EVENT FIRED', event.payload);
          break;
        default:
          break;
      }
    }
  }, [eventLog]);

  return (
    <EventLogContext.Provider value={{ dispatchEvent }}>
      {children}
    </EventLogContext.Provider>
  );
};
