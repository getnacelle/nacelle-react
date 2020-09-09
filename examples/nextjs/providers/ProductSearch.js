import React, { useMemo, useContext } from 'react';
import Fuse from 'fuse.js';

const PROPERTY_FILTERS = ['productType', 'color', 'material', 'size'];

const SearchProductContext = React.createContext([]);
const SearchActionContext = React.createContext(null);

export const ProductSearchProvider = ({ children, products = [] }) => {
  const searchData = useMemo(() => {
    const searchProducts = addFacetsToProducts(products);
    const searchFilters = createSearchFilters(searchProducts);

    return { products: searchProducts, searchFilters };
  }, [products]);

  const searchActions = useMemo(() => {
    const fuse = new Fuse(searchData.products, { keys: ['title'] });

    return {
      searchProducts: (searchValue) => fuse.search(searchValue),
      searchByFilters: (filters, products) => {
        return products.filter((product) => {
          const productFacets = product.facets.map(
            ({ name, value }) => `${name}-${value}`
          );

          return filters.every((filter) => productFacets.includes(filter));
        });
      }
    };
  }, [searchData.products]);

  return (
    <SearchProductContext.Provider value={searchData}>
      <SearchActionContext.Provider value={searchActions}>
        {children}
      </SearchActionContext.Provider>
    </SearchProductContext.Provider>
  );
};

function createSearchFilters(products) {
  return products
    .map((product) => product.facets)
    .flat()
    .filter((facet) => PROPERTY_FILTERS.includes(facet.name))
    .map((facet) => ({ name: facet.name, values: [facet.value] }))
    .reduce((filters, facet) => {
      const filterIndex = filters.findIndex(
        (filter) => filter.name === facet.name
      );

      if (filterIndex > -1) {
        const existingFilter = filters[filterIndex];

        filters[filterIndex] = {
          ...existingFilter,
          values: Array.from(
            new Set([...existingFilter.values, ...facet.values])
          )
        };
        return filters;
      }

      return [...filters, facet];
    }, []);
}

function addFacetsToProducts(products) {
  return products.map(({ tags, variants, productType, ...product }) => {
    const variantFacets = variants
      .map((variant) =>
        variant.selectedOptions.filter((option) => option.name !== 'Title')
      )
      .reduce((filters, option) => filters.concat(option))
      .map((option) => ({ ...option, name: option.name.toLowerCase() }));

    const tagFacets = tags
      .filter((tag) => tag.includes('filter'))
      .reduce((filters, tag) => {
        const [, name, tagValues] = tag.split('_');
        const values = tagValues
          .split('-')
          .map(
            (fragment) =>
              `${fragment.charAt(0).toUpperCase()}${fragment.substring(1)}`
          )
          .join(' ');

        return [...filters, { name, value: values }];
      }, []);

    return {
      ...product,
      tags,
      variants,
      productType,
      facets: [
        ...variantFacets,
        ...tagFacets,
        productType && { name: 'productType', value: productType }
      ].filter(Boolean)
    };
  });
}

export function useProductSearch() {
  const actions = useContext(SearchActionContext);

  return actions;
}

export function useSearchData() {
  const searchData = useContext(SearchProductContext);

  return searchData;
}
