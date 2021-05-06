import {
  useCheckoutState,
  useCheckoutActions,
  useIsCheckingOut,
  CheckoutProvider
} from './use-checkout.provider';
import { CheckoutState, CheckoutActions } from './use-checkout.types';

/**
 * @descr Create a Shopify checkout with Nacelle's Hail Frequency API
 *
 * @returns an array with:
 * - [0]: checkout data object
 * - [1]: checkout functions object containing `processCheckout`, `getCheckout`, and `clearCheckoutData`
 * - [2]: an isCheckingOut boolean
 */
const useCheckout = () => {
  const checkoutState = useCheckoutState();
  const checkoutActions = useCheckoutActions();
  const isCheckingOut = useIsCheckingOut();

  return [checkoutState, checkoutActions, isCheckingOut] as [
    CheckoutState,
    CheckoutActions,
    boolean
  ];
};

export { useCheckout, CheckoutProvider };
