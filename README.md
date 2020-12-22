# Nacelle React

This is a monorepo managed by [Lerna](https://github.com/lerna/lerna). Projects in the monorepo can be found in `./packages`.

## Prerequisites

- Node >= v14.0.0 (LTS)

## Getting Started

```
npm install && npm run bootstrap
```

This will install dependencies for all of the packages, and Lerna will hoist any common packages to the root directory to save space. This means that the root of the project will hold all the common package dependencies and create symlinks in the local package `node_modules` folder.

## Workflow

**Note:** It's recommended that you install `lerna` globally for these commands, but `npx lerna` works as well.

### Adding a New Dependency

In general, it's best to use [`lerna add`](https://github.com/lerna/lerna/tree/main/commands/add#readme) to add new packages to a specific repository. This ensures that local packages do not get out of sync. If you accidentally `npm install` a dependency within one of the packages, you may have to subsequently run `npm run bootstrap` in the project root so that Lerna will re-establish any symlinks. This happens because running `npm install` will overwrite any local symmlinks with the version of the package from the NPM repository.

Here are some examples:

```bash
# adds cool-package as a dependency to every package
lerna add cool-package

# adds cool-package as a dev-dependency to every package
lerna add cool-package --dev

# adds cool-package as a dev-dependency to the component-library package only
lerna add cool-package --dev --scope=component-library

# adds @nacelle/react-hooks (local) to the component library package only (and automatically creates appropriate symlinks)
lerna add @nacelle/react-hooks --scope=component-library
```

### Running Commands Across Projects

Lerna can run npm commands across all projects that have the same commands. Running `npm run test` from the root will run `npm run test` in all the `packages/` that have a "test" npm script.

In the root project, the following global commands are available:

- `npm run test`
- `npm run lint`

### Publishing a Package

```
npm run publish
```

This will update and publish all packages that have changed since the last release (it will show you which packages and the versions that will be published). This makes it easy for making changes across interdependent packages. More info [here](https://github.com/lerna/lerna/tree/main/commands/publish#readme).

## Packages

- [`react-hooks`](https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks): Convenience hooks for use in React applications with Nacelle
- [`component-library`](https://github.com/getnacelle/nacelle-react/tree/main/packages/component-library): Atomic UI components that can be used to create React applications with Nacelle
- [`gatsby-source-nacelle`](https://github.com/getnacelle/nacelle-react/tree/main/packages/gatsby-source-nacelle): A Gatsby source plugin that integrates with the Nacelle SDK
- [`react-klaviyo`](https://github.com/getnacelle/nacelle-react/tree/main/packages/react-klaviyo): Klaviyo components for integrating with Shopify
- [`react-recharge`](https://github.com/getnacelle/nacelle-react/tree/main/packages/react-recharge): Recharge components for integrating with Shopify
- [`react-yotpo`](https://github.com/getnacelle/nacelle-react/tree/main/packages/react-yotpo): Yotpo components for integrating with Shopify

### Creating a New Package

To create a new example project or a new NPM package within the repo, just run `npm run create` from the project root. This script will prompt you and create the appropriate folders with linting, testing, etc already setup!

#### Ensure Public Access for Scoped Packages

If your package is scoped (i.e. `@nacelle/package-name`), be sure to include the `publichConfig` property in the `package.json`. This specifies that the scoped package should be public (the default is private for scoped packages).

```json
"publishConfig": {
  "access": "public"
}
```

## Example Projects

- [`gatsby`](https://github.com/getnacelle/nacelle-react/tree/main/examples/gatsby): A simple Gatsby implementation that uses `gatsby-source-nacelle`
- [`nextjs`](https://github.com/getnacelle/nacelle-react/tree/main/examples/nextjs): An e-commerce store exmaple that uses the Nacelle `component-library` and `react-hooks`
- [`withKlaviyo`](https://github.com/getnacelle/nacelle-react/tree/main/examples/withKlaviyo): An example of integrating Klaviyo with Next.js using `react-klaviyo`
- [`withRecharge`](https://github.com/getnacelle/nacelle-react/tree/main/examples/withRecharge): An example of integrating ReCharge with Next.js using `react-recharge`
- [`withYotpo`](https://github.com/getnacelle/nacelle-react/tree/main/examples/withYotpo): An example of integrating Yotpo with Next.js using `react-yotpo`

### Creating a New Example

Coming soon: a scripted way to create a new package in this project.

#### Ensure Examples Are Private

When creating an example project, be sure to include

```json
"private": true
```

in the `package.json` so that Lerna will not publish that package to NPM.
