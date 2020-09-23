import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { shopifyItem } from '@nacelle/react-dev-utils';

import RechargeSelect from './RechargeSelect';
import { RechargeSelectProps } from './RechargeSelect.types';

function setupSelect(props?: RechargeSelectProps) {
  render(<RechargeSelect {...props} />);

  const subscribeRadio = screen.queryByLabelText(/Subscribe/);
  const oneTimeRadio = screen.queryByLabelText(/One-Time Purchase/);
  const frequencySelect = screen.queryByTestId('recharge-frequency-select');

  return { oneTimeRadio, subscribeRadio, frequencySelect };
}

const defaultProps = {
  product: shopifyItem,
  getCartMetafields: jest.fn()
};

describe('RechargeSelect', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should not mount if the product does not have any subscriptions', () => {
    const props = {
      product: { ...shopifyItem, metafields: [] },
      getCartMetafields: jest.fn()
    };

    const { oneTimeRadio, subscribeRadio, frequencySelect } = setupSelect(
      props
    );

    expect(oneTimeRadio).not.toBeInTheDocument();
    expect(subscribeRadio).not.toBeInTheDocument();
    expect(frequencySelect).not.toBeInTheDocument();
  });

  it('should show the discount % if and an updated price if the item is discounted', () => {
    const { oneTimeRadio, subscribeRadio, frequencySelect } = setupSelect(
      defaultProps
    );

    const subscrbeLabel = screen.getByText(/Subscribe/);

    expect(oneTimeRadio).toBeInTheDocument();
    expect(subscribeRadio).toBeInTheDocument();
    expect(frequencySelect).toBeInTheDocument();
    expect(oneTimeRadio).not.toBeChecked();
    expect(subscribeRadio).toBeChecked();
    expect(subscrbeLabel).toHaveTextContent('Subscribe & SAVE (20%): $196.00');
    expect(defaultProps.getCartMetafields).toHaveBeenCalledTimes(1);
  });

  it('should default to the subscribe option and allow toggling to one-time purchase', () => {
    const { oneTimeRadio, subscribeRadio, frequencySelect } = setupSelect(
      defaultProps
    );

    expect(oneTimeRadio).toBeInTheDocument();
    expect(subscribeRadio).toBeInTheDocument();
    expect(frequencySelect).toBeInTheDocument();
    expect(oneTimeRadio).not.toBeChecked();
    expect(subscribeRadio).toBeChecked();
    expect(defaultProps.getCartMetafields).toHaveBeenCalledTimes(1);
    expect(defaultProps.getCartMetafields).toHaveBeenCalledWith([
      { key: 'charge_interval_frequency', value: '30' },
      { key: 'order_interval_frequency', value: '30' },
      { key: 'order_interval_unit', value: 'day' }
    ]);

    fireEvent.click(oneTimeRadio);

    expect(oneTimeRadio).toBeInTheDocument();
    expect(subscribeRadio).toBeInTheDocument();
    expect(frequencySelect).not.toBeInTheDocument();
    expect(oneTimeRadio).toBeChecked();
    expect(subscribeRadio).not.toBeChecked();
    expect(defaultProps.getCartMetafields).toHaveBeenCalledTimes(2);
    expect(defaultProps.getCartMetafields).toHaveBeenLastCalledWith([]);
  });
});
