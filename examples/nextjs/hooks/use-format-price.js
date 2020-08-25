export default function useFormatPrice(product, price) {
  return new Intl.NumberFormat(product.locale, {
    style: 'currency',
    currency: product.priceRange.currencyCode
  }).format(price);
}
