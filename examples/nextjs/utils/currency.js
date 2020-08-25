export function formatCurrency(price, currency = '$') {
  return `${currency}${parseInt(price).toFixed(2)}`;
}
