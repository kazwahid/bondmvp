'use client'


export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-100 to-coffee-200">
      {/* Navigation */}
      <nav className="px-6 py-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="logo-bond">
            Bond
          </div>
          <a
            href="/auth"
            className="btn-secondary"
          >
            Sign In
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold font-heading text-gradient mb-8 animate-fade-in">
            Bond
          </h1>
          <p className="text-xl md:text-2xl text-coffee-700 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Connect, collaborate, and create meaningful relationships in your professional network
          </p>
          <a
            href="/auth?view=sign_up"
            className="btn-primary text-xl px-12 py-4 shine-effect inline-block"
          >
            Get Started Free
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-coffee-800 mb-4 font-heading">
                Smart Connections
              </h3>
              <p className="text-coffee-600 leading-relaxed">
                AI-powered matching to find the perfect collaborators for your projects and goals
              </p>
            </div>
            <div className="card hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-coffee-800 mb-4 font-heading">
                Seamless Collaboration
              </h3>
              <p className="text-coffee-600 leading-relaxed">
                Integrated tools for communication, project management, and shared workspaces
              </p>
            </div>
            <div className="card hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-coffee-800 mb-4 font-heading">
                Meaningful Relationships
              </h3>
              <p className="text-coffee-600 leading-relaxed">
                Build lasting professional bonds that go beyond simple networking
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}