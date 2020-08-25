import React from 'react';

import * as styles from './item-quantity.styles';

const ItemQuantity = ({
  quantity,
  incrementFn = () => {},
  decrementFn = () => {}
}) => {
  return (
    <div css={styles.counterLayout}>
      <span css={styles.quantity}>{quantity}</span>
      <div css={styles.counterSwitchLayout}>
        <button css={styles.counterSwitch} onClick={incrementFn}>
          +
        </button>
        <button css={styles.counterSwitch} onClick={decrementFn}>
          -
        </button>
      </div>
    </div>
  );
};

export default ItemQuantity;
