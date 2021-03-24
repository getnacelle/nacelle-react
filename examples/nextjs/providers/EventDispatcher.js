import React, { useEffect, useReducer } from 'react';

export const EventLogContext = React.createContext();

const eventReducer = (state, event) => {
  if (
    event.type === 'PAGE_VIEW' ||
    event.type === 'PRODUCT_VIEW' ||
    event.type === 'ADD_TO_CART' ||
    event.type === 'REMOVE_FROM_CART' ||
    event.type === 'CHECKOUT_INIT'
  ) {
    return [...state, event];
  }
  return state;
};

export const EventDispatcherProvider = ({ children }) => {
  const [eventLog, dispatchEvent] = useReducer(eventReducer, []);

  useEffect(() => {
    if (eventLog.length > 0 && typeof window !== 'undefined') {
      const event = eventLog.pop();
      switch (event.type) {
        case 'PAGE_VIEW':
          console.log('PAGE VIEW EVENT FIRED');
          break;
        case 'PRODUCT_VIEW':
          console.log(
            'PRODUCT_VIEW EVENT FIRED',
            JSON.stringify(event.payload, null, 2)
          );
          break;
        case 'ADD_TO_CART':
          console.log(
            'ADD_TO_CART EVENT FIRED',
            JSON.stringify(event.payload, null, 2)
          );
          break;
        case 'REMOVE_FROM_CART':
          console.log(
            'REMOVE_FROM_CART EVENT FIRED',
            JSON.stringify(event.payload, null, 2)
          );
          break;
        case 'CHECKOUT_INIT':
          console.log(
            'CHECKOUT_INIT EVENT FIRED',
            JSON.stringify(event.payload, null, 2)
          );
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
