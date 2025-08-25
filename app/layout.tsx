import './globals.css'
import '@fontsource/playfair-display'
import '@fontsource/inter'
import '@fontsource/jetbrains-mono'
import type { Metadata, Viewport } from 'next'
import { AuthProvider } from '@/components/auth/AuthProvider'
import SmoothScrolling from '@/components/ui/SmoothScrolling'
import CustomCursor from '@/components/ui/CustomCursor'

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
}

export const metadata: Metadata = {
	title: 'BondStudio ',
	description: 'Building connections that last, loyalty that grows, and experiences that inspire.',
	icons: {
		icon: '/favicon.svg?v=5',
		shortcut: '/favicon.svg?v=5',
		apple: '/favicon.svg?v=5',
	},
	manifest: '/manifest.json',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="scroll-smooth">
			<head />
			<body className="antialiased bg-celestial-50 text-celestial-950 min-h-screen font-sans cursor-none">
				<SmoothScrolling>
					<AuthProvider>
						<CustomCursor />
						<div id="__toast_host" />
						{children}
					</AuthProvider>
				</SmoothScrolling>
			</body>
		</html>
	)
}