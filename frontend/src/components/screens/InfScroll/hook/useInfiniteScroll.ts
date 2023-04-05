import { act } from '@testing-library/react'
import { useEffect, useState } from 'react'

export const useInfiniteScroll = (onScroll: () => void) => {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    let queue: NodeJS.Timeout
    window.addEventListener('scroll', () => {
      clearTimeout(queue)
      queue = setTimeout(() => {
        const scroll_Y = document.documentElement.scrollTop + window.innerHeight
        const offsetHeight = document.documentElement.offsetHeight

        if (offsetHeight - scroll_Y <= 1000 && !isLoading && offsetHeight > 1500) {
          act(() => {
            setIsLoading(true)
          })
          onScroll()
          act(() => {
            setIsLoading(false)
          })
        }
      }, 1000)
    })
  })

  return isLoading
}
