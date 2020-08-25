import React from 'react';
import { HeroBanner, SideBySide } from 'components';

export default function Sections({ sections, options }) {
  return (
    Array.isArray(sections) &&
    sections.map((section) => {
      const type = section?.sys?.contentType?.sys?.id;
      switch (type) {
        case 'heroBanner': {
          return (
            <HeroBanner
              fields={section.fields}
              key={section.sys.id}
              textColor={
                options && options.heroBanner && options.heroBanner.textColor
              }
            />
          );
        }
        case 'sideBySide': {
          return <SideBySide fields={section.fields} key={section.sys.id} />;
        }
        // ...add additional cases for whichever content types are needed
      }
    })
  );
}
