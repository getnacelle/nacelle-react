import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';

// Note: `prodcut` comes from the URL, courtesy of our router
const Products = ({ product }) => {
  const [time, setTime] = useState(Date.now());
  const [count, setCount] = useState(10);

  useEffect(() => {
    let timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div class={style.profile}>
      <h1>Profile: {product}</h1>
      <p>This is the product profile for a product named {product}.</p>

      <div>Current time: {new Date(time).toLocaleString()}</div>

      <p>
        <button onClick={() => setCount((count) => count + 1)}>Click Me</button>{' '}
        Clicked {count} times.
      </p>
    </div>
  );
};

export default Products;
