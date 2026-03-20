import { useRef } from 'react'
import { useMountEffect } from './useMountEffect'

export function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)

  useMountEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  })

  return ref
}
