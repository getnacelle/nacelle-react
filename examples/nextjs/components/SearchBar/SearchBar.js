import React, { useState, Fragment, useEffect } from 'react';
import { Button, TextInput } from '@nacelle/react-components';
import { formatCurrency } from '@nacelle/react-dev-utils';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { useProductSearch } from 'providers/ProductSearch';
import * as styles from './SearchBar.styles';

const SearchResults = ({ show, results, hideResults, resetSearchValue }) => {
  if (!show) {
    return null;
  }

  const onItemClick = () => {
    hideResults();
    resetSearchValue();
  };

  return (
    <Fragment>
      <div onClick={hideResults} css={styles.mask} />
      <div css={styles.resultModal}>
        <h2 css={styles.resultTitle}>Search Results</h2>
        {results.map(({ item }, idx) => {
          const formatPrice = formatCurrency(
            item.locale,
            item.priceRange.currencyCode
          );

          return (
            <Link
              href={`/products/${item.handle}`}
              key={`${idx}-${item.handle}`}
            >
              <a onClick={onItemClick}>
                <div css={styles.resultCard}>
                  <Image
                    src={item.variants[0].featuredMedia.src}
                    width="100"
                    height="100"
                    css={styles.productImage}
                  />
                  <h4 css={styles.productTitle}>{item.title}</h4>
                  <span>{formatPrice(item.variants[0].price)}</span>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </Fragment>
  );
};

const SearchBar = () => {
  const { searchProducts } = useProductSearch();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      const results = searchProducts(searchValue);
      setSearchResults(results.slice(0, 9));
      if (results.length) {
        setShowResults(true);
      }
    }, 1000);

    return () => clearTimeout(debouncedSearch);
  }, [searchValue, searchProducts]);

  const hideResults = () => setShowResults(false);
  const onInputChange = (evt) => setSearchValue(evt.target.value);
  const routeToSearchPage = () => router.push('/search');
  const resetSearchValue = () => setSearchValue('');

  return (
    <Fragment>
      <div css={styles.layout}>
        <TextInput
          styles={styles.input}
          value={searchValue}
          onChange={onInputChange}
          placeholder="Search Products..."
        />
        <Button
          variant="secondary"
          styles={styles.button}
          onClick={routeToSearchPage}
        >
          <svg
            width={24}
            color="#3b3b3b"
            aria-hidden="true"
            data-prefix="far"
            data-icon="search"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
            />
          </svg>
        </Button>
      </div>
      <SearchResults
        show={showResults}
        results={searchResults}
        hideResults={hideResults}
        resetSearchValue={resetSearchValue}
      />
    </Fragment>
  );
};

export default SearchBar;
