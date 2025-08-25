'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import ProtectedPage from '@/components/auth/ProtectedPage'
import ToastHost from '@/components/ui/ToastHost'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
	const { user } = useAuth()

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		window.location.href = '/auth'
	}

	return (
		<ProtectedPage>
			<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
				<main>{children}</main>
				<ToastHost />
			</div>
		</ProtectedPage>
	)
}
