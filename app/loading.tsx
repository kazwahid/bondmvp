import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <LoadingSpinner 
        size="md"
        text="Loading"
        subtext="Please wait..."
      />
    </div>
  )
} 