import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';
import { getProductByHandleQuery as query } from '../../helpers/queries';
import headers from '../../helpers/headers';
import { connect } from 'unistore/preact';
import { actions } from '../../store/store';

const Products = connect(
  'lineItems',
  actions
)(({ handle, lineItems, addLineItem, flyoutCart }) => {
  const [product, setProduct] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});
  const [quantity, setQuantity] = useState(1);

  const selectVariantHandler = (e) => {
    setSelectedVariant(
      product.variants.find((variant) => variant.id === e.target.value)
    );
  };

  const handleATC = () => {
    const lineItem = {
      image: product.featuredMedia,
      title: product.title,
      variant: selectedVariant,
      metafields: selectedVariant.metafields,
      productId: product.id,
      handle: handle,
      quantity
    };
    addLineItem(lineItem);
    flyoutCart();
  };

  useEffect(async () => {
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
    setProduct(data.data.getProductByHandle);
    setSelectedVariant(data.data.getProductByHandle.variants[0]);
  }, []);
  return (
    <div class={style.products}>
      {product.title && (
        <>
          <h1>Product: {product.title}</h1>
          <div>
            {product.featuredMedia && (
              <img
                src={product.featuredMedia.src}
                style={{ maxHeight: '200px' }}
              />
            )}
          </div>
          <div>
            <label for="variants">Variants: </label>
            <select name="variants" onChange={(e) => selectVariantHandler(e)}>
              {product.variants.map((variant) => (
                <option value={variant.id}>{variant.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label for="quantity">Quantity: </label>
            <input
              name="quantity"
              type="number"
              min="1"
              defaultValue={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            Price: <b>${selectedVariant.price * quantity}</b>
          </div>
          <div>
            <button onClick={handleATC}>Add To Cart</button>
          </div>
        </>
      )}
    </div>
  );
});

export default Products;
