import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FlyingPosters({
  items = [],
  className = "",
  ...props
}: {
  items?: string[];
  className?: string;
  [key: string]: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    if (items.length > 0) {
      setIsLoading(false);
    }
  }, [items.length]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [items.length]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden relative ${className}`}
      {...props}
    >
      {/* Enhanced gradient background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-bg via-surface/5 to-bg z-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-accent/5 z-0"
        animate={{
          backgroundPosition: ["0% 100%", "100% 0%", "0% 100%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Subtle floating particles */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            animate={{
              x: [0, Math.random() * 300 - 150],
              y: [0, Math.random() * 300 - 150],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main poster display */}
      <div className="relative w-full h-full flex items-center justify-center z-10">
        {isLoading ? (
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.7, y: 30, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -30, rotateY: 15 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Poster container */}
              <div className="relative group">
                {/* Main image with enhanced effects */}
                <motion.div
                  className="relative w-96 h-[28rem] md:w-[28rem] md:h-[32rem] rounded-3xl overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Enhanced shadow and glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/20 rounded-3xl blur-3xl scale-110 opacity-60" />
                  
                  <motion.img
                    src={items[currentIndex]}
                    alt={`Coffee shop ${currentIndex + 1}`}
                    className="relative w-full h-full object-cover rounded-3xl"
                    initial={{ scale: 1.2, filter: "brightness(0.8) saturate(0.8)" }}
                    animate={{ 
                      scale: 1.2, 
                      filter: "brightness(1) saturate(1.1)",
                    }}
                    transition={{ 
                      duration: 12, 
                      ease: "easeInOut",
                      filter: { duration: 8, ease: "easeInOut" }
                    }}
                    style={{
                      filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.4))",
                    }}
                  />
                  
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />
                  
                  {/* Floating accent elements */}
                  <motion.div
                    className="absolute top-6 right-6 w-3 h-3 bg-accent/80 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <motion.div
                    className="absolute bottom-6 left-6 w-2 h-2 bg-accent/60 rounded-full"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </motion.div>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/30 via-accent/15 to-accent/30 rounded-3xl blur-3xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Minimal progress indicator - only visible on hover */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-20 opacity-0 hover:opacity-100 transition-opacity duration-500"
        whileHover={{ opacity: 1 }}
      >
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              index === currentIndex
                ? 'bg-accent w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>

      {/* Floating accent elements */}
      <motion.div
        className="absolute top-1/4 left-12 w-1 h-1 bg-accent/50 rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-16 w-0.5 h-0.5 bg-accent/40 rounded-full"
        animate={{
          scale: [1, 3, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Additional floating elements for mesmerization */}
      <motion.div
        className="absolute top-1/2 left-8 w-0.5 h-0.5 bg-accent/30 rounded-full"
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-3/4 right-8 w-1 h-1 bg-accent/25 rounded-full"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.2, 0.4, 0.2],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* More mesmerizing elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-accent/20 rounded-full"
        animate={{
          scale: [1, 3, 1],
          opacity: [0.1, 0.4, 0.1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent/35 rounded-full"
        animate={{
          scale: [1, 2.2, 1],
          opacity: [0.2, 0.6, 0.2],
          y: [0, -25, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}
