function getPluginOption(pluginOptions, option) {
  // Accepts any camelCase, PascalCase, kebab-case, or sssnek_case option
  const sanitize = (str) => str.replace(/[-_]/g, '').toLowerCase();
  if (Array.isArray(option)) {
    return option.map(
      (opt) =>
        pluginOptions[
          Object.keys(pluginOptions).find(
            (key) => sanitize(key) === sanitize(opt)
          )
        ]
    );
  }

  return pluginOptions[
    Object.keys(pluginOptions).find((key) => sanitize(key) === sanitize(option))
  ];
}

module.exports = function (pluginOptions) {
  // Extract credentials from plugin options
  const [
    nacelleSpaceId,
    nacelleGraphqlToken,
    cmsPreview,
    contentfulPreviewSpaceId,
    contentfulPreviewApiToken
  ] = getPluginOption(pluginOptions, [
    'nacellespaceid',
    'nacellegraphqltoken',
    'cmspreview',
    'contentfulpreviewspaceid',
    'contentfulpreviewapitoken'
  ]);

  if (!nacelleSpaceId) {
    throw new Error(`Please provide a Nacelle Space ID to 'gatsby-source-nacelle'. For example:
  
        {
          resolve: 'gatsby-source-nacelle',
          options: {
            nacelleSpaceId: process.env.NACELLE_SPACE_ID,
            nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN
          }
        }
      `);
  }

  if (!nacelleGraphqlToken) {
    throw new Error(`Please provide a Nacelle GraphQL Token to 'gatsby-source-nacelle'. For example:
  
          {
            resolve: 'gatsby-source-nacelle',
            options: {
              nacelleSpaceId: process.env.NACELLE_SPACE_ID,
              nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN
            }
          }
        `);
  }

  if (cmsPreview && !contentfulPreviewSpaceId) {
    throw new Error(`To enable CMS preview, please provide a Contentful Space ID to 'gatsby-source-nacelle'. For example:
  
          {
            resolve: 'gatsby-source-nacelle',
            options: {
              nacelleSpaceId: process.env.NACELLE_SPACE_ID,
              nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN,
              cmsPreview: true,
              contentfulPreviewSpaceId: process.env.CONTENTFUL_SPACE_ID,
              contentfulPreviewApiToken: process.env.CONTENTFUL_PREVIEW_API_TOKEN
            }
          }
        `);
  }

  if (cmsPreview && !contentfulPreviewApiToken) {
    throw new Error(`To enable CMS preview, please provide a Contentful Preview API Token to 'gatsby-source-nacelle'. For example:
  
          {
            resolve: 'gatsby-source-nacelle',
            options: {
              nacelleSpaceId: process.env.NACELLE_SPACE_ID,
              nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN,
              cmsPreview: true,
              contentfulPreviewSpaceId: process.env.CONTENTFUL_SPACE_ID,
              contentfulPreviewApiToken: process.env.CONTENTFUL_PREVIEW_API_TOKEN
            }
          }
        `);
  }

  return {
    nacelleSpaceId,
    nacelleGraphqlToken,
    cmsPreview,
    contentfulPreviewSpaceId,
    contentfulPreviewApiToken
  };
};
