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
	// Mobile-optimized settings
	themeColor: '#0f172a',
}

export const metadata: Metadata = {
	title: 'BondStudio - Loyalty Programs That Build Connections',
	description: 'Transform your business with AI-powered loyalty programs. Build lasting customer relationships, increase retention, and drive growth with our innovative customer engagement platform.',
	keywords: [
		'loyalty program',
		'coffee shop loyalty',
		'customer engagement',
		'business growth',
		'customer retention',
		'AI loyalty platform',
		'coffee shop management',
		'customer analytics',
		'business automation',
		'digital loyalty cards',
		'customer rewards',
		'business intelligence',
		'coffee shop software',
		'customer relationship management',
		'business optimization'
	].join(', '),
	authors: [{ name: 'BondStudio Team' }],
	creator: 'BondStudio',
	publisher: 'BondStudio',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://bondstudio.com',
		title: 'BondStudio - Loyalty Programs That Build Connections',
		description: 'Transform your business with AI-powered loyalty programs. Build lasting customer relationships, increase retention, and drive growth.',
		siteName: 'BondStudio',
		images: [
			{
				url: '/images/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'BondStudio - AI-Powered Loyalty Programs',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'BondStudio - Loyalty Programs That Build Connections',
		description: 'Transform your business with AI-powered loyalty programs. Build lasting customer relationships, increase retention, and drive growth.',
		images: ['/images/twitter-image.jpg'],
		creator: '@bondstudio',
		site: '@bondstudio',
	},
	icons: {
		icon: [
			{ url: '/favicon.svg', type: 'image/svg+xml' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		shortcut: '/favicon.svg',
		apple: [
			{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
		other: [
			{ url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
			{ url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
		],
	},
	manifest: '/manifest.json',
	// Additional SEO metadata
	alternates: {
		canonical: 'https://bondstudio.com',
	},
	category: 'business',
	classification: 'Business Software',
	// Structured data for better search results
	other: {
		'google-site-verification': 'your-verification-code',
		'msvalidate.01': 'your-ms-validation-code',
	},
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
				
				{/* Additional SEO meta tags */}
				<meta name="author" content="BondStudio Team" />
				<meta name="copyright" content="BondStudio" />
				<meta name="language" content="English" />
				<meta name="revisit-after" content="7 days" />
				<meta name="distribution" content="global" />
				<meta name="rating" content="general" />
				
				{/* Mobile optimization */}
				<meta name="HandheldFriendly" content="true" />
				<meta name="MobileOptimized" content="width" />
				<meta name="apple-touch-fullscreen" content="yes" />
				
				{/* Performance optimization */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="dns-prefetch" href="https://bondstudio.com" />
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