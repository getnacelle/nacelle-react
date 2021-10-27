import { formatCurrency } from './format';

const currencies = [
  {
    locale: 'de-DE',
    currencyCode: 'EUR',
    value: 2744,
    expectedValue: '2.744,00 €'
  },
  {
    locale: 'en-US',
    currencyCode: 'USD',
    value: 2744,
    expectedValue: '$2,744.00'
  },
  {
    locale: 'en-IN',
    currencyCode: 'EUR',
    value: 2744,
    expectedValue: '€2,744.00'
  },
  {
    locale: 'ja-JP',
    currencyCode: 'JPY',
    value: 2744,
    expectedValue: '￥2,744'
  },
  {
    locale: 'es-MX',
    currencyCode: 'MXN',
    value: 2744,
    expectedValue: '$2,744.00'
  }
];

describe('formatCurrency()', () => {
  currencies.forEach(({ locale, currencyCode, value, expectedValue }) => {
    it('should format a currency based on the locale and currency code', () => {
      const formatNumber = formatCurrency(locale, currencyCode);
      const result = formatNumber(value);
      expect(result).toEqual(expectedValue);
    });
  });
});
