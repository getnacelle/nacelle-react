import { useState, useEffect } from 'react'
import $nacelle from 'services/nacelle.js'

export default function useCollection(collection, list = "default") {
  const [products, setProducts] = useState([])
  const handles = collection
    .productLists
    .find(listEntry => listEntry.slug === list)
    .handles

  useEffect(() => {
    const fetchCollectionProducts = async () => {
      try {
        const products = await $nacelle.data.products({ handles })
        setProducts(products)
      } catch {
        console.warn(`Collection not found with handle: '${collection.handle}'`)
      }
    }
    fetchCollectionProducts()
  }, [handles, collection])

  return products
}
