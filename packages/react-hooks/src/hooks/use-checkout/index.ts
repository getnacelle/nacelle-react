import {
  useCheckoutState,
  useCheckoutActions,
  CheckoutProvider
} from './use-checkout.provider';

const useCheckout = () => {
  const checkoutState = useCheckoutState();
  const checkoutActions = useCheckoutActions();

  return [checkoutState, checkoutActions];
};

export { useCheckout, CheckoutProvider };
