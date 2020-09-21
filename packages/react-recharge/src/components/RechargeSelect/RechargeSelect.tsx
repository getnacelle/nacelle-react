// disabling this eslint rule because we need to use
// on-change to track values in the select element
/* eslint-disable jsx-a11y/no-onchange */
/** @jsx jsx */
import { FC, ChangeEvent, useState, useMemo, useEffect } from 'react';
import { jsx } from '@emotion/core';
import {
  ShopifyItem,
  Metafield,
  formatCurrency
} from '@nacelle/react-dev-utils';

import {
  RechargeSelectProps,
  Metafields,
  CartMetafield
} from './RechargeSelect.types';
import * as styles from './RechargeSelect.styles';

/**
 * Creates a selectable delivery frequency component
 */
const RechargeSelect: FC<RechargeSelectProps> = ({
  product,
  disabled,
  oneTimeLabel = 'One-Time Purchase',
  subscriptionLabel = 'Subscribe',
  getCartMetafields,
  containerStyles,
  onChange
}) => {
  const [purchaseType, setPurchaseType] = useState('subscribe');
  const [frequency, setFrequency] = useState('');

  const productMetafields = product.metafields.filter(
    ({ namespace }) => namespace === 'subscriptions'
  );

  const metafields = useMemo<Metafields>(
    () => mapMetafields(productMetafields),
    [productMetafields]
  );

  useEffect(() => {
    if (productMetafields.length > 0) {
      setFrequency(metafields.shipping_interval_frequency[0]);

      const cartMetafields = createCartMetafields(
        metafields.shipping_interval_frequency[0],
        metafields.shipping_interval_unit_type
      );

      getCartMetafields(cartMetafields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!productMetafields.length) {
    return null;
  }

  const onFrequencyChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    setFrequency(evt.currentTarget.value);

    const cartMetafields = createCartMetafields(
      evt.currentTarget.value,
      metafields.shipping_interval_unit_type
    );

    return getCartMetafields(cartMetafields);
  };

  const onPurchaseTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPurchaseType(evt.currentTarget.value);
    onChange && onChange(evt, product);

    const cartMetafields =
      evt.currentTarget.value === 'subscribe'
        ? createCartMetafields(
            frequency,
            metafields.shipping_interval_unit_type
          )
        : [];

    return getCartMetafields(cartMetafields);
  };

  const discountPrice = calculateDiscountPrice(
    product,
    metafields.discount_percentage
  );
  const subscriptionText =
    metafields.discount_percentage > 0
      ? `${subscriptionLabel} & SAVE (${metafields.discount_percentage}%): ${discountPrice}`
      : subscriptionLabel;

  return (
    <div css={[styles.container, containerStyles]}>
      <article
        css={[
          styles.radioContainer,
          purchaseType !== 'onetime' && styles.notSelected
        ]}
      >
        <div css={styles.radioLayout}>
          <input
            css={styles.radio}
            name="recharge-radio"
            type="radio"
            id="recharge-radio-onetime"
            value="onetime"
            disabled={disabled}
            onChange={onPurchaseTypeChange}
            checked={purchaseType === 'onetime'}
          />
          <label css={styles.label} htmlFor="recharge-radio-onetime">
            {oneTimeLabel}
          </label>
        </div>
      </article>
      <article
        css={[
          styles.radioContainer,
          purchaseType !== 'subscribe' && styles.notSelected
        ]}
      >
        <div css={styles.radioLayout}>
          <input
            css={styles.radio}
            name="recharge-radio"
            type="radio"
            id="recharge-radio-subscribe"
            value="subscribe"
            disabled={disabled}
            onChange={onPurchaseTypeChange}
            checked={purchaseType === 'subscribe'}
          />
          <label css={styles.label} htmlFor="recharge-radio-subscribe">
            {subscriptionText}
          </label>
        </div>
        {purchaseType === 'subscribe' && (
          <div css={styles.frequencyContainer}>
            <label
              htmlFor="recharge-requency-select"
              css={styles.frequencyTitle}
            >
              Delivery Every:
            </label>
            <select
              css={styles.select}
              id="recharge-frequency-select"
              data-testid="recharge-frequency-select"
              onChange={onFrequencyChange}
            >
              {metafields.shipping_interval_frequency.map((subFrequency) => (
                <option key={subFrequency} value={frequency}>
                  {subFrequency} {metafields.shipping_interval_unit_type}
                </option>
              ))}
            </select>
          </div>
        )}
      </article>
    </div>
  );
};

function mapMetafields(metafields: Metafield[]): Metafields {
  return metafields.reduce<Metafields>((mappedFields, metafield) => {
    switch (metafield.key) {
      case 'has_subscription':
      case 'is_subscription_only':
        return {
          ...mappedFields,
          [metafield.key]: metafield.value.toLowerCase() === 'true'
        };
      case 'shipping_interval_frequency':
        return {
          ...mappedFields,
          [metafield.key]: metafield.value.split(',')
        };
      case 'discount_percentage':
        return { ...mappedFields, [metafield.key]: Number(metafield.value) };
      default:
        return { ...mappedFields, [metafield.key]: metafield.value };
    }
  }, {} as Metafields);
}

function calculateDiscountPrice(
  product: ShopifyItem,
  discountPercent: number
): string {
  if (!discountPercent) {
    return '';
  }

  const price = Number(product.priceRange.max);
  const discountPrice = price - price * (discountPercent / 100);

  const formatPrice = formatCurrency(
    product.locale,
    product.variants[0].priceCurrency
  );

  return formatPrice(discountPrice);
}

function createCartMetafields(
  frequency: string,
  frequencyUnit: string
): CartMetafield[] {
  return [
    { key: 'charge_interval_frequency', value: frequency },
    { key: 'order_interval_frequency', value: frequency },
    {
      key: 'order_interval_unit',
      value: frequencyUnit.toLowerCase().replace('s', '')
    }
  ];
}

export default RechargeSelect;
