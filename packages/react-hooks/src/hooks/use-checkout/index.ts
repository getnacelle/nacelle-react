import {
  useCheckoutState,
  useCheckoutActions,
  useIsCheckingOut,
  CheckoutProvider
} from './use-checkout.provider';
import { CheckoutState, CheckoutActions } from './use-checkout.types';

/**
 * Create and manage checkouts.
 *
 * @returns an array with:
 * - [0]: checkout data object
 * - [1]: object containing `processCheckout`, `getCheckout`, and `clearCheckoutData` checkout functions
 * - [2]: an `isCheckingOut` boolean
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
