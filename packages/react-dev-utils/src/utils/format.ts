export function formatCurrency(
  locale: string,
  currencyCode: string
): (price: number) => string {
  const options = {
    style: 'currency',
    currency: currencyCode
  };

  return (price: number): string =>
    new Intl.NumberFormat(locale, options).format(price);
}
