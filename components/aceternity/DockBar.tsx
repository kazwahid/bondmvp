'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { LayoutDashboard, QrCode, Settings } from 'lucide-react'

interface DockItem {
	label: string
	href: string
	icon: any
}

const items: DockItem[] = [
	{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
	{ label: 'QR', href: '/qr', icon: QrCode },
	{ label: 'Settings', href: '/settings', icon: Settings },
]

export default function DockBar() {
	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center">
			<motion.div
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-border bg-dark-900/70 backdrop-blur px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
			>
				{items.map((item) => (
					<Link key={item.href} href={item.href} className="group relative">
						<motion.div
							whileHover={{ y: -4, scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted hover:text-fg transition-colors"
						>
							<item.icon className="h-5 w-5" />
							<span className="hidden sm:block">{item.label}</span>
						</motion.div>

						{/* hover tooltip for xs */}
						<div className="sm:hidden absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-dark-800 px-2 py-1 text-xs text-fg opacity-0 group-hover:opacity-100">
							{item.label}
						</div>
					</Link>
				))}
			</motion.div>
		</div>
	)
}


