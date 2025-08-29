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
	maximumScale: 5,
	minimumScale: 1,
	userScalable: true,
	viewportFit: 'cover',
}

export const metadata: Metadata = {
	title: 'BondStudio ',
	description: 'Building connections that last, loyalty that grows, and experiences that inspire.',
	keywords: 'loyalty program, coffee shop, customer engagement, business growth',
	authors: [{ name: 'BondStudio Team' }],
	creator: 'BondStudio',
	publisher: 'BondStudio',
	robots: 'index, follow',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://bondstudio.com',
		title: 'BondStudio - Loyalty Programs That Build Connections',
		description: 'Building connections that last, loyalty that grows, and experiences that inspire.',
		siteName: 'BondStudio',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'BondStudio - Loyalty Programs That Build Connections',
		description: 'Building connections that last, loyalty that grows, and experiences that inspire.',
	},
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
			<head>
				<meta name="theme-color" content="#0f172a" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="BondStudio" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="format-detection" content="telephone=no" />
			</head>
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