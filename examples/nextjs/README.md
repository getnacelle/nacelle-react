## Getting Started

First, setup the appropriate environment variables in `.env.local`:

- `NEXT_PUBLIC_NACELLE_SPACE_ID` - your Nacelle Space Id from the Nacelle dashboard
- `NEXT_PUBLIC_NACELLE_GRAPHQL_TOKEN` - your Nacelle GraphQL Token from the Nacelle dashboard
- `NEXT_PUBLIC_NACELLE_ENDPOINT` - your Nacelle Storefront GraphQL Endpoint address from the Nacelle Dashboard

Then start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Previewing Products and Content

This project uses [Next.js Preview](https://nextjs.org/docs/advanced-features/preview-mode) conventions to fetch draft / preview data from your PIM & CMS. Please refer to our [Next.js Preview Mode](https://docs.getnacelle.com/next/intro-next.html#preview-mode) docs for instructions & recipes for enabling Preview Mode in your headless storefront.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Nacelle's Next.js Documentation](https://docs.getnacelle.com/next/intro-next.html)
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js' features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy with Vercel

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com/import).

Check out our [Next.js deployment documentation](https://docs.getnacelle.com/next/intro-next.html#deploying-your-project) for more details.
