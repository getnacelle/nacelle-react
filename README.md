# Nacelle React

This is a monorepo managed by [Lerna](https://github.com/lerna/lerna). Projects in the monorepo can be found in `./packages`.

## Getting Started

```
npm run bootstrap
```

This will install dependencies for all of the packages, and Lerna will hoist any common packages to the root directory to save space.

## Other Commands

## Running Commands Across Projects

Lerna can run npm commands across all projects that have the same commands. Running `npm run test` from the root will run `npm run test` in all the `packages/` that have a "test" npm script.

In the root project, the following global commands are available:

- `npm run test`
- `npm run lint`

## Publishing a Package

```
npx lerna publish [major | minor | patch | premajor | preminor | prepatch | prerelease]
```

This will update and publish all packages that have changed since the last release. This makes it easy for making changes across interdependent packages. More info [here](https://github.com/lerna/lerna/tree/master/commands/publish#readme).

## Packages

- `react-hooks`: Convenience hooks for use in React applications with Nacelle
