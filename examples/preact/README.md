# Using Preact with Nacelle

[Preact](https://preactjs.com/) is a Fast 3kB alternative to React with the same modern API.

## nacelle-preact-sample

### The Basics

The Preact [repo](https://github.com/getnacelle/nacelle-react/tree/main/examples) is the source for this project.

At the moment, the project is very bare-bones and handles the following operations out of the box:

- Fetch product & collection data & display them
- Fetch Navigation data & display it
- Add products to a cart & checkout

More features can easily be added to it such as a connection to CMS data (more on this later).

### Getting started

At the root of the project start by adding an `.env` file with the following vars:

```
NACELLE_SPACE_ID="xxx"
NACELLE_GRAPHQL_TOKEN="xxx"
```

### CLI Commands

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and enzyme
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

### Fetching data from Nacelle

If you would like to extend the functionality for this project you can use the [**Nacelle Hail Frequency GraphQL API**](https://docs.getnacelle.com/api-reference/hail-frequency.html).

This will allow you to fetch data that we indexed from your **PIM** or **CMS**
