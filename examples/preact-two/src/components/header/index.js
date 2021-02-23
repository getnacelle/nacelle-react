import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Link } from 'preact-router/match';
import style from './style.css';
import headers from '../../helpers/headers';
import { getSpaceQuery as query } from '../../helpers/queries';

const Header = () => {
  useEffect(async () => {
    const res = await fetch('https://hailfrequency.com/v2/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query
      })
    });
    const data = await res.json();
    console.log(data);
  }, []);

  return (
    <header class={style.header}>
      <h1>Preact App</h1>
      <nav>
        <Link activeClassName={style.active} href="/">
          Home
        </Link>
        <Link activeClassName={style.active} href="/profile">
          Me
        </Link>
        <Link activeClassName={style.active} href="/profile/john">
          John
        </Link>
      </nav>
    </header>
  );
};

export default Header;
