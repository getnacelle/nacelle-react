# @nacelle/react-hooks

> React Components for building Nacelle apps

## Install

### With NPM

```bash
npm i @nacelle/react-components
```

### With Yarn

```bash
yarn add @nacelle/react-components
```

## Usage

```tsx
import React, { FC } from 'react';
import { Button } from '@nacelle/react-components';

type Props = {};

const MyComponent: FC<Props> = () => (
  <div>
    <Button fullWidth>Click Here!</Button>
  </div>
);

export default MyComponent;
```

## Styling

All components use [Emotion's CSS object syntax](https://emotion.sh/docs/object-styles), and can be passed a `styles` prop that can overwrite any of the pre-defined styles.

```tsx
import React, { FC } from 'react';
import { Button } from '@nacelle/react-components';
import { CSSObject } from '@emotion/core';

type Props = {};

const customStyles: CSSObject = { backgroundColor: 'seafoamgreen' };

const MyComponent: FC<Props> = () => (
  <div>
    <Button styles={customStyles}>Click Here!</Button>
  </div>
);

export default MyComponent;
```

## License

ISC © [getnacelle](https://github.com/getnacelle)
