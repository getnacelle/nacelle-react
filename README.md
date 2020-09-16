# Nacelle React

This is a monorepo managed by [Lerna](https://github.com/lerna/lerna). Projects in the monorepo can be found in `./packages`.

## Getting Started

```
npm install
npm run bootstrap
```

This will install dependencies for all of the packages, and Lerna will hoist any common packages to the root directory to save space. This means that the root of the project will hold all the common package dependencies and create symlinks in the local package `node_modules` folder.

## Workflow

**Note:** It's recommended that you install `lerna` globally for these commands, but `npx lerna` works as well.

## Adding a New Dependency

## Running Commands Across Projects

Lerna can run npm commands across all projects that have the same commands. Running `npm run test` from the root will run `npm run test` in all the `packages/` that have a "test" npm script.

In the root project, the following global commands are available:

- `npm run test`
- `npm run lint`

## Publishing a Package

```
lerna publish
```

This will update and publish all packages that have changed since the last release (it will show you which packages and the versions that will be published). This makes it easy for making changes across interdependent packages. More info [here](https://github.com/lerna/lerna/tree/master/commands/publish#readme).

## Packages

- [`react-hooks`](https://github.com/getnacelle/nacelle-react/tree/master/packages/react-hooks): Convenience hooks for use in React applications with Nacelle
- [`component-library`](https://github.com/getnacelle/nacelle-react/tree/master/packages/component-library): Atomic UI components that can be used to create React applications with Nacelle
- [`gatsby-source-nacelle`](https://github.com/getnacelle/nacelle-react/tree/master/packages/gatsby-source-nacelle): A Gatsby source plugin that integrates with the Nacelle SDK
- [`react-klaviyo`](https://github.com/getnacelle/nacelle-react/tree/master/packages/react-klaviyo): Klaviyo components for integrating with Shopify
- [`react-recharge`](https://github.com/getnacelle/nacelle-react/tree/master/packages/react-recharge): Recharge components for integrating with Shopify
- [`react-yotpo`](https://github.com/getnacelle/nacelle-react/tree/master/packages/react-yotpo): Yotpo components for integrating with Shopify

### Creating a New Package

## Example Projects

- [`gatsby`](https://github.com/getnacelle/nacelle-react/tree/master/examples/gatsby): A simple Gatsby implementation that uses `gatsby-source-nacelle`
- [`nextjs`](https://github.com/getnacelle/nacelle-react/tree/master/examples/nextjs): An e-commerce store exmaple that uses the Nacelle `component-library` and `react-hooks`
- [`withKlaviyo`](<(https://github.com/getnacelle/nacelle-react/tree/master/examples/withKlaviyo)>): An example of integrating Klaviyo with Next.js using `react-klaviyo`
- [`withRecharge`](https://github.com/getnacelle/nacelle-react/tree/master/examples/withRecharge): An example of integrating ReCharge with Next.js using `react-recharge`
- [`withYotpo`](https://github.com/getnacelle/nacelle-react/tree/master/examples/withYotpo): An example of integrating Yotpo with Next.js using `react-yotpo`

### Creating a New Example
