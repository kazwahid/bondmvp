'use client'

import { motion } from 'framer-motion'

export default function Metrics() {
	const metrics = [
		{ value: '99.9%', label: 'Uptime' },
		{ value: '0+', label: 'Businesses' },
		{ value: 'SOON', label: 'Check-ins' },
		
	]

	return (
		<section className="py-24 bg-bg">
			<div className="max-w-3xl mx-auto px-6">
				<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid grid-cols-3 gap-8">
					{metrics.map((m, i) => (
						<motion.div key={m.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i }} className="text-center">
							<div className="text-2xl md:text-3xl font-bold mb-1">{m.value}</div>
							<div className="text-xs uppercase tracking-wider text-muted">{m.label}</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}


