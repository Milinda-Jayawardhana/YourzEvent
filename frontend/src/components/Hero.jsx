import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const slides = [
    {
      id: 'intro',
      type: 'text',
      eyebrow: 'Yourz Events',
      title: 'Flowers, Gifting, and Event Styling that Deserve the Spotlight.',
      description:
        'Step into a more curated floral experience with bouquet collections, gift-ready moments, and event styling crafted to feel memorable from the very first glance.'
    },
    { id: 's1', type: 'image', image: '/s1.jpeg' },
    { id: 's2', type: 'image', image: '/s2.jpeg' },
    { id: 's3', type: 'image', image: '/s3.jpeg' }
  ]

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goPrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className='relative h-[430px] w-full overflow-hidden rounded-[2.25rem] border border-[#ead7c3] bg-[#fff8f1] sm:h-[480px] lg:h-[500px]'>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlideIndex
              ? 'pointer-events-auto scale-100 opacity-100'
              : 'pointer-events-none scale-[1.03] opacity-0'
          }`}
        >
          {slide.type === 'text' ? (
            <div className="relative flex h-full items-start justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,252,248,1),_rgba(246,232,220,1)_52%,_rgba(234,213,196,1)_100%)] px-5 pb-12 pt-12 text-center sm:items-center sm:px-10 sm:py-8">
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(177,124,95,0.18)_0%,_rgba(177,124,95,0.05)_52%,_transparent_74%)]" />
              <div className="absolute left-10 top-10 hidden h-20 w-20 rounded-[2rem] border border-white/70 bg-white/40 backdrop-blur-sm sm:block" />
              <div className="absolute bottom-12 right-12 hidden h-16 w-16 rounded-full border border-[#d8b79e] bg-[#f3dfcf]/85 sm:block" />

              <div className="relative z-10 mx-auto flex max-w-[19rem] flex-col items-center sm:max-w-3xl">
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#a06c51] sm:text-xs sm:tracking-[0.45em]">{slide.eyebrow}</p>
                <h1 className="mt-4 max-w-4xl font-['Prata'] text-[1.65rem] leading-[1.2] text-[#3f2d24] sm:mt-5 sm:text-5xl sm:leading-tight lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-2xl text-[13px] leading-6 text-[#6f5648] sm:mt-6 sm:text-base sm:leading-7">
                  {slide.description}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
                  <Link
                    to="/services"
                    className="rounded-full border border-[#6f4c3a] bg-[#6f4c3a] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-[#543629] hover:bg-[#543629] sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.2em]"
                  >
                    Explore Services
                  </Link>
                  <Link
                    to="/services/floral-arrangements/flower-bouquets"
                    className="rounded-full border border-[#d6bda7] bg-white/80 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6b4d3f] backdrop-blur-sm transition-colors hover:bg-white sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.2em]"
                  >
                    Shop Flowers
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <img
              src={slide.image}
              alt="slide"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ))}

      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[#fffaf4]/90 p-2 text-[#6f5648] shadow-md transition-colors hover:bg-white"
        aria-label="Previous slide"
      >
        &#10094;
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[#fffaf4]/90 p-2 text-[#6f5648] shadow-md transition-colors hover:bg-white"
        aria-label="Next slide"
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 w-3 rounded-full transition-all ${
              currentSlideIndex === index ? 'bg-white' : 'bg-[#f3e4d6] hover:bg-[#fffaf4]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
