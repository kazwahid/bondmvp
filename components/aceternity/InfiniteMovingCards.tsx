'use client'

import { useEffect, useRef, useState } from 'react'

type Card = { title: string; desc: string; icon?: string }

export default function InfiniteMovingCards({ cards, speed = 'normal' }: { cards: Card[], speed?: 'slow' | 'normal' | 'fast' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(false)
  
  useEffect(() => {
    if (ref.current) {
      const scrollerInner = ref.current.querySelector('.scroller-inner')
      if (scrollerInner) {
        const scrollerContent = Array.from(scrollerInner.children)
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true)
          scrollerInner.appendChild(duplicatedItem)
        })
        setStart(true)
      }
    }
  }, [])

  const getSpeed = () => {
    switch (speed) {
      case 'slow': return '40s'
      case 'fast': return '20s'
      default: return '30s'
    }
  }

  return (
    <div ref={ref} className="scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
      <div className={`scroller-inner flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap ${start ? 'animate-scroll' : ''}`} style={{ animationDuration: getSpeed() }}>
        {cards.map((card, i) => (
          <div key={i} className="w-[350px] max-w-full relative rounded-2xl border border-dark-700 bg-dark-900/50 backdrop-blur p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex-shrink-0 hover:border-primary-600 transition-all duration-300">
            {card.icon && <div className="text-2xl mb-3">{card.icon}</div>}
            <h3 className="text-lg font-heading text-white mb-2">{card.title}</h3>
            <p className="text-dark-300 text-sm leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </div>
  )
}
