'use client'
// OTP with resend and inline statuses


import { useState } from 'react'
import { sendCustomerOtp, upsertCustomerPhone, verifyCustomerOtp } from '@/lib/supabase'

export default function OTPBind({ customerId }: { customerId?: string }) {
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [resendIn, setResendIn] = useState(0)

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Sending code…')
    try {
      await sendCustomerOtp(phone)
      setSent(true)
      setStatus('Code sent!')
      setResendIn(30)
      const iv = setInterval(() => setResendIn((s) => { if (s <= 1) { clearInterval(iv); return 0 } return s - 1 }), 1000)
    } catch (e: any) {
      setStatus(`Failed to send code${e?.message?`: ${e.message}`:''}`)
    }
  }

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Verifying…')
    try {
      await verifyCustomerOtp(phone, code)
      if (customerId) await upsertCustomerPhone(customerId, phone)
      setStatus('Saved')
    } catch (e) {
      setStatus('Invalid code')
    }
  }

  if (!sent) {
    return (
      <form className="mt-2 flex gap-2" onSubmit={submitPhone}>
        <input type="tel" pattern="[0-9\-\s]{10,}" placeholder="e.g., +92 300 1234567" value={phone} onChange={(e)=>setPhone(e.target.value.startsWith('+92')? e.target.value : `+92 ${e.target.value.replace(/^\+?/, '')}`)} className="flex-1 border rounded-lg px-3 py-2" />
        <button className="btn-primary disabled:opacity-60" type="submit" disabled={resendIn>0}>{resendIn>0?`Resend in ${resendIn}s`:'Send code'}</button>
        {status && <span className="text-xs text-coffee-600 ml-2">{status}</span>}
      </form>
    )
  }
  return (
    <form className="mt-2 flex gap-2" onSubmit={submitCode}>
      <input type="text" inputMode="numeric" pattern="[0-9]{4,8}" value={code} onChange={(e)=>setCode(e.target.value.replace(/\D/g,''))} placeholder="Enter code" className="flex-1 border rounded-lg px-3 py-2" />
      <button className="btn-primary" type="submit">Verify</button>
      {status && <span className="text-xs text-coffee-600 ml-2">{status}</span>}
    </form>
  )
}

