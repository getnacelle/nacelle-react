import React from 'react';
import { Button } from '@nacelle/react-components';

import * as styles from './ItemQuantity.styles';

const ItemQuantity = ({
  quantity,
  incrementFn = () => {},
  decrementFn = () => {}
}) => {
  return (
    <div css={styles.counterLayout}>
      <span css={styles.quantity}>{quantity}</span>
      <div css={styles.counterSwitchLayout}>
        <Button styles={styles.counterSwitch} onClick={incrementFn}>
          +
        </Button>
        <Button styles={styles.counterSwitch} onClick={decrementFn}>
          -
        </Button>
      </div>
    </div>
  );
};

export default ItemQuantity;
