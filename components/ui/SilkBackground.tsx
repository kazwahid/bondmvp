'use client'

import { motion } from 'framer-motion'

interface SilkBackgroundProps {
  speed?: number
  scale?: number
  color?: string
  noiseIntensity?: number
  rotation?: number
}

export default function SilkBackground({
  speed = 5,
  scale = 1,
  color = "#7B7481",
  noiseIntensity = 1.5,
  rotation = 0,
}: SilkBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Animated Silk-like Pattern */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20 / speed,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: `
            radial-gradient(circle at 20% 50%, ${color}40 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${color}30 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, ${color}20 0%, transparent 50%),
            linear-gradient(45deg, ${color}10 0%, transparent 50%, ${color}15 100%)
          `,
          backgroundSize: `${100 * scale}px ${100 * scale}px`,
          transform: `rotate(${rotation}rad)`,
        }}
      />
      
      {/* Flowing Silk Pattern */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '200% 200%'],
        }}
        transition={{
          duration: 30 / speed,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: `
            conic-gradient(from 0deg at 50% 50%, 
              ${color}20 0deg, 
              transparent 60deg, 
              ${color}10 120deg, 
              transparent 180deg, 
              ${color}15 240deg, 
              transparent 300deg, 
              ${color}20 360deg
            )
          `,
          backgroundSize: `${150 * scale}px ${150 * scale}px`,
          transform: `rotate(${-rotation}rad)`,
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* Noise Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              ${color}05 0px,
              transparent 1px,
              transparent 2px,
              ${color}03 3px
            ),
            repeating-linear-gradient(
              -45deg,
              ${color}03 0px,
              transparent 1px,
              transparent 2px,
              ${color}05 3px
            )
          `,
          opacity: noiseIntensity * 0.1,
        }}
      />
      
      {/* Flowing Waves */}
      <motion.div
        className="absolute inset-0"
        animate={{
          transform: ['translateX(0%) translateY(0%)', 'translateX(-50%) translateY(-25%)'],
        }}
        transition={{
          duration: 25 / speed,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              ${color}08 25%, 
              ${color}12 50%, 
              ${color}08 75%, 
              transparent 100%
            )
          `,
          backgroundSize: '200% 100%',
          opacity: 0.6,
        }}
      />
    </div>
  )
}


