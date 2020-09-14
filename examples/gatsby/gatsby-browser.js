import * as React from 'react';
import Layout from './src/components/layout';

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>;
