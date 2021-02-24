import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';
import headers from '../../helpers/headers';
import { getProductCollectionQuery as query } from '../../helpers/queries';

const Collections = ({ collection }) => {
  const [productList, setProductList] = useState([]);

  useEffect(async () => {
    try {
      // const res = await fetch('https://hailfrequency.com/v2/graphql', {
      //   method: 'POST',
      //   headers,
      //   body: JSON.stringify({
      //     query: query,
      //     variables: {
      //       handle: collection,
      //       locale: 'en-US'
      //     }
      //   })
      // });
      // console.log(res);
      // const data = await res.json();
      // console.log(data);
      // setLinks(data.data.getSpace.linklists[0].links);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div class={style.profile}>
      <h1>Collection: {collection}</h1>
    </div>
  );
};

export default Collections;
