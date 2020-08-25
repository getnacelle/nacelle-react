export function formatCurrency(locale, currencyCode) {
  const options = {
    style: 'currency',
    currency: currencyCode
  };

  return (price) => new Intl.NumberFormat(locale, options).format(price);
}
