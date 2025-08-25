import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Simple redirect logic without Supabase auth check in middleware
  // Auth protection will be handled in the page components

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/qr/:path*', '/settings/:path*']
}
