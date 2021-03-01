import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';
import headers from '../../helpers/headers';
import { getCollectionByHandleQuery as query } from '../../helpers/queries';
import { Link } from 'preact-router/match';

const Collections = ({ handle }) => {
  const [collection, setCollection] = useState({});

  useEffect(async () => {
    try {
      const res = await fetch('https://hailfrequency.com/v2/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables: {
            handle
          }
        })
      });
      const data = await res.json();
      setCollection(data.data.getCollectionByHandle);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div class={style.collections}>
      {collection.title && (
        <>
          <h1>Collection: {collection.title}</h1>
          <ul class="list">
            {collection.productLists[0].handles.map((handle) => {
              return (
                <li>
                  <Link href={'/products/' + handle}>{handle}</Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Collections;
