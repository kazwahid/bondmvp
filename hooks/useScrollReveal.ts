'use client'

import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'

export function useScrollReveal(amount = 0.1, once = true) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount, once })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [isInView, controls])

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return { ref, controls, variants, isInView }
}

export function useStaggeredReveal(itemCount: number, staggerDelay = 0.1) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.1, once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return { ref, controls, containerVariants, itemVariants, isInView }
}
