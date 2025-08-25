'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Interactive3D, { ConnectionOrb } from '@/components/ui/Interactive3D'

export default function HeroSection() {
	const containerRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	})

	const y = useTransform(scrollYProgress, [0, 1], [0, -100])
	const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	return (
		<section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg">
			{/* Atmospheric Background Video */}
			<div className="absolute inset-0 opacity-20">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg z-10" />
				<motion.div
					className="absolute inset-0"
					animate={{ 
						background: [
							'radial-gradient(circle at 20% 30%, #FFFFFF 0.5px, transparent 0.5px)',
							'radial-gradient(circle at 80% 70%, #FFFFFF 0.5px, transparent 0.5px)',
							'radial-gradient(circle at 40% 60%, #FFFFFF 0.5px, transparent 0.5px)',
						]
					}}
					transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
					style={{ backgroundSize: '120px 120px' }}
				/>
			</div>
			
			<motion.div style={{ y, opacity }} className="max-w-7xl mx-auto container-padding text-left relative z-10">
				{/* Lumus-inspired immersive hero */}
				<motion.div
					initial={{ opacity: 0, y: 60 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
					className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
				>
					{/* Interactive 3D Main headline */}
					<div className="lg:col-span-7">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.8 }}
							className="text-xs uppercase tracking-[0.3em] text-muted mb-8 font-medium"
						>
							Connection Infrastructure
						</motion.div>

						<Interactive3D intensity={0.3} className="mb-8">
							<h1 className="hero-text text-fg leading-none">
								<motion.span
									initial={{ opacity: 0, y: 40 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5, duration: 0.8 }}
									className="block"
								>
									Build
								</motion.span>
								<motion.span
									initial={{ opacity: 0, y: 40 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.7, duration: 0.8 }}
									className="block relative"
								>
									<span className="relative z-10">Trust.</span>
									<motion.div
										className="absolute inset-0 bg-gradient-to-r from-fg/10 to-transparent"
										animate={{ scaleX: [0, 1, 0] }}
										transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
									/>
								</motion.span>
								<motion.span
									initial={{ opacity: 0, y: 40 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.9, duration: 0.8 }}
									className="block text-muted"
								>
									Grow.
								</motion.span>
							</h1>
						</Interactive3D>

						{/* Lumus-inspired tagline */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 1.1, duration: 0.8 }}
							className="text-lg font-medium text-fg/80 mb-8"
						>
							Connection statt Komplexität
						</motion.div>
					</div>

					{/* Interactive Connection Orb & CTA */}
					<div className="lg:col-span-5 flex flex-col items-center lg:items-end">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
							className="mb-8"
						>
							<ConnectionOrb className="mb-8" />
						</motion.div>

						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.3, duration: 0.8 }}
							className="text-lg text-muted mb-8 font-light leading-relaxed text-center lg:text-right max-w-md"
						>
							The loyalty infrastructure that creates authentic connections between businesses and their customers.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.5, duration: 0.8 }}
							className="flex flex-col sm:flex-row gap-4"
						>
							<motion.a
								href="/auth"
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
								className="px-8 py-4 bg-fg text-bg font-medium hover:bg-muted transition-all duration-300 text-center group"
							>
								<span>Start Building</span>
								<motion.span
									className="inline-block ml-2"
									animate={{ x: [0, 4, 0] }}
									transition={{ duration: 2, repeat: Infinity }}
								>
									→
								</motion.span>
							</motion.a>
							<motion.button
								onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="px-8 py-4 border border-border text-fg hover:bg-surface transition-all duration-300"
							>
								Explore More
							</motion.button>
						</motion.div>
					</div>
				</motion.div>

				{/* Enhanced scroll indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2, duration: 0.8 }}
					className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
				>
					<motion.div
						animate={{ y: [0, 8, 0] }}
						transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
						className="flex flex-col items-center text-muted"
					>
						<div className="text-xs uppercase tracking-wider mb-2">Scroll to explore</div>
						<div className="w-px h-16 bg-gradient-to-b from-muted to-transparent" />
						<motion.div
							animate={{ y: [0, 8, 0] }}
							transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
							className="w-1 h-1 bg-muted rounded-full mt-2"
						/>
					</motion.div>
				</motion.div>
			</motion.div>
		</section>
	)
}