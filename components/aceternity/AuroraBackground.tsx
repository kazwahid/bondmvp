'use client'

import { ReactNode } from 'react'

type AuroraVariant = 'landing' | 'auth' | 'dashboard' | 'qr' | 'settings' | 'customer'

export default function AuroraBackground({ children, variant = 'landing' }: { children: ReactNode, variant?: AuroraVariant }) {
	const getAuroraStyles = () => {
		switch (variant) {
			case 'landing':
				return 'bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 [background-image:radial-gradient(at_40%_20%,rgba(73,197,182,0.15)_0px,transparent_50%),radial-gradient(at_80%_0%,rgba(255,147,152,0.12)_0px,transparent_50%),radial-gradient(at_0%_50%,rgba(73,197,182,0.08)_0px,transparent_50%)]'
			case 'auth':
				return 'bg-gradient-to-br from-dark-950 to-dark-900 [background-image:radial-gradient(at_50%_0%,rgba(73,197,182,0.2)_0px,transparent_50%),radial-gradient(at_20%_80%,rgba(255,147,152,0.15)_0px,transparent_50%)]'
			case 'dashboard':
				return 'bg-gradient-to-br from-dark-950 to-dark-800 [background-image:radial-gradient(at_20%_30%,rgba(73,197,182,0.12)_0px,transparent_50%),radial-gradient(at_90%_40%,rgba(255,147,152,0.08)_0px,transparent_50%),radial-gradient(at_0%_100%,rgba(73,197,182,0.06)_0px,transparent_50%)]'
			case 'qr':
				return 'bg-gradient-to-br from-dark-900 to-dark-800 [background-image:radial-gradient(at_60%_20%,rgba(73,197,182,0.18)_0px,transparent_50%),radial-gradient(at_10%_60%,rgba(255,147,152,0.12)_0px,transparent_50%)]'
			case 'settings':
				return 'bg-gradient-to-br from-dark-800 to-dark-900 [background-image:radial-gradient(at_80%_10%,rgba(255,147,152,0.15)_0px,transparent_50%),radial-gradient(at_30%_90%,rgba(73,197,182,0.1)_0px,transparent_50%)]'
			case 'customer':
				return 'bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 [background-image:radial-gradient(at_50%_50%,rgba(73,197,182,0.12)_0px,transparent_50%)]'
			default:
				return 'bg-gradient-to-br from-dark-950 to-dark-900'
		}
	}

	return (
		<div className={`relative min-h-screen ${getAuroraStyles()}`}>
			<div className="grain-overlay" />
			<div className="relative z-10">
				{children}
			</div>
		</div>
	)
}
