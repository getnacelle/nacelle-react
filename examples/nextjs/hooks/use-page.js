import { useState, useEffect } from 'react'
import $nacelle from 'services/nacelle.js'

export default function usePage({ handle }) {
  const [page, setPage] = useState({})

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const products = await $nacelle.data.page({ handle })
        setPage(products)
      } catch {
        console.warn(`Page not found with handle: '${handle}'`)
      }
    }
    fetchPage()
  }, [handle])

  return page
}
