export default function TestFonts() {
  return (
    <div className="min-h-screen bg-celestial-gradient bg-celestial-pattern p-8">
      <div className="max-w-4xl mx-auto space-celestial-xl">
        <h1 className="text-6xl font-serif font-light text-celestial-950 text-center">
          Celestial Typography Test
        </h1>
        
        <div className="celestial-card-elevated p-8 space-celestial-lg">
          <h2 className="text-4xl font-serif font-light text-celestial-950">
            Serif Headings (Playfair Display)
          </h2>
          <p className="text-lg text-celestial-700">
            This is body text using Inter font. The design system should now have a sophisticated, 
            minimalist, and futuristic aesthetic inspired by Perplexity Comet.
          </p>
        </div>

        <div className="celestial-card p-8 space-celestial-lg">
          <h3 className="text-2xl font-serif font-light text-celestial-950">
            Color Palette Test
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="w-20 h-20 bg-celestial-50 rounded-lg border border-celestial-200"></div>
            <div className="w-20 h-20 bg-celestial-100 rounded-lg border border-celestial-200"></div>
            <div className="w-20 h-20 bg-celestial-200 rounded-lg border border-celestial-200"></div>
            <div className="w-20 h-20 bg-celestial-300 rounded-lg border border-celestial-200"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="w-20 h-20 bg-accent-50 rounded-lg border border-celestial-200"></div>
            <div className="w-20 h-20 bg-accent-100 rounded-lg border border-celestial-200"></div>
            <div className="w-20 h-20 bg-accent-500 rounded-lg border border-celestial-200"></div>
            <div className="w-20 h-20 bg-accent-600 rounded-lg border border-celestial-200"></div>
          </div>
        </div>

        <div className="celestial-card p-8 space-celestial-lg">
          <h3 className="text-2xl font-serif font-light text-celestial-950">
            Button System Test
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-celestial-primary">Primary Button</button>
            <button className="btn-celestial-secondary">Secondary Button</button>
          </div>
        </div>

        <div className="celestial-card p-8 space-celestial-lg">
          <h3 className="text-2xl font-serif font-light text-celestial-950">
            Input System Test
          </h3>
          <input 
            type="text" 
            placeholder="Test input field" 
            className="input-celestial w-full max-w-md"
          />
        </div>
      </div>
    </div>
  )
}

