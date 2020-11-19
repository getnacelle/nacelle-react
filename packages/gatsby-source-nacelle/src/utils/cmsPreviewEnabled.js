module.exports = function (pluginOptions) {
  const {
    contentfulPreviewSpaceId,
    contentfulPreviewApiToken,
    cmsPreviewEnabled
  } = pluginOptions;

  const contentfulPreviewVariablesExist = Boolean(
    contentfulPreviewSpaceId && contentfulPreviewApiToken
  );

  const previewEnabled = cmsPreviewEnabled
    ? cmsPreviewEnabled && contentfulPreviewVariablesExist
    : contentfulPreviewVariablesExist;

  if (
    !contentfulPreviewVariablesExist &&
    (contentfulPreviewSpaceId || contentfulPreviewApiToken)
  ) {
    console.warn(
      `[NACELLE] Warning! Both 'contentfulPreviewSpaceId' and 'contentfulPreviewApiToken' ` +
        `must be provided in order to source content from Contentful's Preview API.`
    );
  }

  return previewEnabled;
};
