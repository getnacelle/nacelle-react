## Getting Started

First, setup the appropriate environment variables in `.env.local`:

- `NACELLE_SPACE_ID` - your Nacelle Space Id from the Nacelle dashboard
- `NACELLE_GRAPHQL_TOKEN` - your Nacelle GraphQL Token from the Nacelle dashboard

To preview products & collections from Shopify ([docs](https://docs.getnacelle.com/integrations/shopify-preview.html)) and draft content from Contentful, you'll need the following environment variables in addition to the two above:

- `NACELLE_PREVIEW_MODE` - a boolean indicating if preview mode should be enabled. `true` will enable preview mode.
- `CONTENTFUL_SPACE_ID` - the Contentful Space Id from Contentful's settings page
- `CONTENTFUL_PREVIEW_API_TOKEN` - the Contentful API Token from Contentful's settings page
- `MYSHOPIFY_DOMAIN` - your \*.myshopify.com subdomain
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - the Storefront Access Token from your [Nacelle private app](https://docs.getnacelle.com/quick-start.html#_1-setup-shopify)

Then start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Previewing Products and Content

NOTE: The preview feature takes advantage of Next.js API Routes. When running this project locally, please use the [Vercel CLI](https://vercel.com/docs/cli).

This project uses [Next.js Preview](https://nextjs.org/docs/advanced-features/preview-mode) conventions to fetch unpublished products from Shopify and content from Contentful. In order to activate preview, you must access the app via the [API Route](https://nextjs.org/docs/api-routes/introduction) `/api/preview`, which takes a `path` query parameter. For example, to preview an unpublished Shopify product with the handle `dania-glasses`, visit `/api/preview?path=/products/dania-glasses`. To preview an unpublished page with the handle `shipping-policy`, visit `/api/preview?path=/pages/shipping-policy`. In both cases, `/pages/api/preview.js` will redirect you to the desired path, and will pass `context.preview` to `getStaticProps` (docs)[https://nextjs.org/docs/advanced-features/preview-mode#fetch-preview-data] to signal to the `$nacelle` client that it should fetch preview data.

### Configuring Preview Routes in Contentful

If you have a preview configuration in Contentful (settings -> content preview) to make it easy for content editors to preview draft pages (recommended), be sure to configure preview routes with the `/api/preview?path=/some/path` convention described above.

For instance, the `Page` type can be previewed with:

```
https://my-nacelle-preview-site.vercel.app/api/preview?path=/pages/{entry_field.handle}
```

## Exit Preview Mode

To [delete the Next.js Preview cookies](https://nextjs.org/docs/advanced-features/preview-mode#clear-the-preview-mode-cookies), simply visit `/api/exit-preview`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy with Vercel

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com/import).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
