## Getting Started

First, setup the appropriate environment variables in `.env.local`:

- `NACELLE_SPACE_ID` - your Nacelle Space Id from the Nacelle dashboard
- `NACELLE_GRAPHQL_TOKEN` - your Nacelle GraphQL Token from the Nacelle dashboard

To use Contentful's Preview Mode, you'll need the following environment variables in addition to the two above:

- `NACELLE_PREVIEW_MODE` - a boolean indicating if preview mode should be enabled. `true` will enable preview mode.
- `VERCEL_GITHUB_COMMIT_REF` - a Vercel [system environment variable](https://vercel.com/docs/build-step#system-environment-variables) that specifies the branch the deployment was made from. Note that this is only relevant for a Vercel deployment and is set automatically by Vercel.
- `CONTENTFUL_PREVIEW_SPACE_ID` - the Contentful Space Id from Contentful's settings page
- `CONTENTFUL_PREVIEW_API_TOKEN` - the Contentful API Token from Contentful's settings page

Then run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
