'use client'

import { useRouter } from 'next/navigation'

export default function SignUpBar() {
  const router = useRouter()
  return (
    <div className="w-full rounded-2xl border border-coffee-200 bg-white/70 backdrop-blur p-2 flex items-center gap-2">
      <input placeholder="your@email.com" className="flex-1 px-3 py-2 rounded-xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-300 bg-white/70" />
      <button onClick={()=>router.push('/auth?view=sign_up')} className="btn-primary">Sign up</button>
    </div>
  )
}

