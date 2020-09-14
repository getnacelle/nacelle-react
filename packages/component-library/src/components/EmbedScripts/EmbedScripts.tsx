import React, { FC, Fragment } from 'react';

export type EmbedScriptsProps = {
  scripts: HtmlScript[];
};

export type HtmlScript = {
  defer?: boolean;
  async?: boolean;
  src: string;
  type: string;
};

/**
 * This component will create script tags for any third-party
 * integrations.
 */
const EmbedScripts: FC<EmbedScriptsProps> = ({ scripts }) => {
  return (
    <Fragment>
      {scripts.map((script) => (
        <script
          key={script.src}
          src={script.src}
          async={script.async}
          defer={script.defer}
          type={script.type}
        ></script>
      ))}
    </Fragment>
  );
};

export default EmbedScripts;
