'use client'

import { motion } from 'framer-motion'

export default function InfiniteMovingCards({ items = [] as { title: string; desc: string }[] }) {
	return (
		<div className="relative overflow-hidden py-6">
			<div className="flex gap-4 animate-[scroll_30s_linear_infinite] will-change-transform">
				{[...items, ...items].map((card, i) => (
					<motion.div
						key={i}
						whileHover={{ y: -2 }}
						className="w-[350px] max-w-full relative rounded-2xl border border-border bg-dark-900/50 backdrop-blur p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex-shrink-0 hover:border-primary-600 transition-all duration-300"
					>
						<h4 className="text-lg font-semibold mb-2">{card.title}</h4>
						<p className="text-muted text-sm leading-relaxed">{card.desc}</p>
					</motion.div>
				))}
			</div>
			<style jsx>{`
				@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
			`}</style>
		</div>
	)
}
