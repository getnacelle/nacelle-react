import useCart from './use-cart';

export default function useAddToCart(product, selectedVariant, quantity) {
  const [, { addToCart, toggleCart }] = useCart();
  const addItemToCart = () => {
    const item = { ...product, variant: selectedVariant, quantity };

    addToCart(item);
    return toggleCart();
  };

  return addItemToCart;
}
