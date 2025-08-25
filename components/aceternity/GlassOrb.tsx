'use client'

import { motion } from 'framer-motion'

export default function GlassOrb() {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ duration: 1.2 }} className="pointer-events-none absolute inset-0 -z-10">
			<motion.div
				className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
				style={{ background: 'radial-gradient(circle at 30% 30%, rgba(245,233,218,0.35), transparent 60%), radial-gradient(circle at 70% 70%, rgba(234,217,197,0.25), transparent 60%)' }}
				animate={{ rotate: 360 }}
				transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
			/>
			<motion.div
				className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
				animate={{ rotate: -360 }}
				transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
			/>
		</motion.div>
	)
}


