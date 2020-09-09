import React, { Fragment, useEffect, useState } from 'react';
import { TextInput, Grid } from '@nacelle/react-components';

import ProductGallery from 'components/ProductGallery';
import { useProductSearch, useSearchData } from 'providers/ProductSearch';
import * as styles from '../styles/pages.styles';

const SearchFilter = ({ filter, onClick, isChecked }) => {
  return (
    <div css={styles.filterLayout}>
      <h4 css={styles.filterTitle}>{splitCamelCaseWord(filter.name)}</h4>
      <Grid columns="repeat(auto-fit, minmax(106px, 1fr))">
        {filter.values.map((filterValue, idx) => {
          const combinedFilter = `${filter.name}-${filterValue}`;

          return (
            <div css={styles.checkboxLayout} key={`${filterValue}-${idx}`}>
              <input
                type="checkbox"
                id={filterValue.toLowerCase()}
                onChange={onClick(combinedFilter)}
                checked={isChecked(combinedFilter)}
              />
              <label htmlFor={filterValue.toLowerCase()}>{filterValue}</label>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default function Search() {
  const { searchProducts, searchByFilters } = useProductSearch();
  const { searchFilters, products } = useSearchData();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      const results = searchProducts(searchValue).map(({ item }) => item);

      if (!results.length && !filters.length) {
        return setSearchResults(products);
      }

      if (filters.length) {
        const productsToFilter = results.length ? results : products;
        const filteredResults = searchByFilters(filters, productsToFilter);

        return setSearchResults(filteredResults);
      }

      return setSearchResults(results);
    }, 1000);

    return () => clearTimeout(debouncedSearch);
  }, [searchValue, searchProducts, filters, products, searchByFilters]);

  const onCheckboxClick = (filterValue) => () => {
    const filteredValues = filters.filter((value) => value !== filterValue);
    const filterIsSelected = filteredValues.length !== filters.length;

    if (filterIsSelected) {
      return setFilters(filteredValues);
    }

    return setFilters((filters) => [...filters, filterValue]);
  };

  const filterIsSelected = (filterValue) =>
    filters.findIndex((value) => value === filterValue) > -1;

  const onInputChange = (evt) => setSearchValue(evt.target.value);

  return (
    <Fragment>
      <section css={styles.filterSection}>
        <TextInput
          styles={styles.searchInput}
          value={searchValue}
          onChange={onInputChange}
          placeholder="Search Products..."
        />
        <h2 css={styles.refineSearch}>Refine Your Search</h2>
        <Grid columns={4} gridGap={32} styles={styles.filterGrid}>
          {searchFilters.map((filter, idx) => (
            <SearchFilter
              filter={filter}
              key={`${filter}-${idx}`}
              onClick={onCheckboxClick}
              isChecked={filterIsSelected}
            />
          ))}
        </Grid>
      </section>
      <h4 css={styles.resultCount}>
        Showing {searchResults.length} items based on selected filters
      </h4>
      <ProductGallery products={searchResults} />
    </Fragment>
  );
}

function splitCamelCaseWord(word) {
  return word.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}
