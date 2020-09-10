import * as React from 'react'
import Layout from './src/components/layout'

export const wrapRootElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
