import { useState, useEffect } from 'react'
import $nacelle from 'services/nacelle.js'

export default function useSpace() {
  const [space, setSpace] = useState({})

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const spaceData = await $nacelle.data.space()
        setSpace(spaceData)
      } catch {
        console.warn('Space data not found')
      }
    }
    fetchSpace()
  }, [])

  return space
}
