import React from 'react';
import $nacelle from 'services/nacelle';
import { Sections, ProductGallery, ProductCard } from 'components';

export default function Shop({ page, products }) {
  return (
    <>
      <main>
        {page && <Sections sections={page.sections} />}
        <ProductGallery>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} linkToPDP />
          ))}
        </ProductGallery>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const products = await $nacelle.data.allProducts();
    const page = await $nacelle.data.page({ handle: 'shop' });
    return {
      props: { products, page }
    };
  } catch (err) {
    console.error(`Error fetching products on homepage:\n${err}`);
  }
}
