'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface FlowingMenuItem {
  link: string
  text: string
  image: string
}

interface FlowingMenuProps {
  items: FlowingMenuItem[]
}

export default function FlowingMenu({ items }: FlowingMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!menuRef.current) return

    // GSAP animations for menu items
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    
    itemRefs.current.forEach((item, index) => {
      if (item) {
        tl.to(item, {
          y: -20,
          duration: 2,
          ease: "power2.inOut",
          delay: index * 0.2
        }, index * 0.1)
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className="menu-wrap" ref={menuRef}>
      <nav className="menu">
        {items.map((item, index) => (
          <div
            key={index}
            className="menu__item"
            ref={(el) => {
              itemRefs.current[index] = el
            }}
          >
            <a href={item.link} className="menu__item-link">
              {item.text}
            </a>
            <div className="marquee">
              <div className="marquee__inner-wrap">
                <div className="marquee__inner">
                  <span>{item.text}</span>
                  <div 
                    className="marquee__img" 
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <span>{item.text}</span>
                  <div 
                    className="marquee__img" 
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </nav>

      <style jsx>{`
        .menu-wrap {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .menu {
          display: flex;
          flex-direction: column;
          height: 100%;
          margin: 0;
          padding: 0;
        }

        .menu__item {
          flex: 1;
          position: relative;
          overflow: hidden;
          text-align: center;
          box-shadow: 0 -1px #fff;
        }

        .menu__item-link {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          position: relative;
          cursor: pointer;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          font-weight: 600;
          color: #fff;
          font-size: 4vh;
          transition: color 0.3s ease;
        }

        .menu__item-link:hover {
          color: #060010;
        }

        .menu__item-link:focus:not(:focus-visible) {
          color: #fff;
        }

        .marquee {
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: #fff;
          transform: translate3d(0, 101%, 0);
          transition: transform 0.6s ease-expo;
        }

        .marquee__inner-wrap {
          height: 100%;
          width: 200%;
          display: flex;
          transform: translateX(0);
        }

        .marquee__inner {
          display: flex;
          align-items: center;
          position: relative;
          height: 100%;
          width: 200%;
          will-change: transform;
          animation: marquee 15s linear infinite;
        }

        .marquee span {
          color: #060010;
          white-space: nowrap;
          text-transform: uppercase;
          font-weight: 400;
          font-size: 4vh;
          line-height: 1.2;
          padding: 1vh 1vw 0;
        }

        .marquee__img {
          width: 200px;
          height: 7vh;
          margin: 2em 2vw;
          padding: 1em 0;
          border-radius: 50px;
          background-size: cover;
          background-position: 50% 50%;
        }

        .menu__item-link:hover + .marquee {
          transform: translate3d(0, 0%, 0);
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
