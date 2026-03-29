import { useEffect, useState } from 'react'

const Hero = () => {
  const sliderImages = ['/s1.jpeg', '/s2.jpeg', '/s3.jpeg']
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [sliderImages.length])

  const goPrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1))
  }

  const goNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length)
  }

  return (
    <div className='relative h-[350px] w-full overflow-hidden rounded-[2.25rem] border border-[#ead7c3] bg-[#fff8f1] sm:h-[400px] lg:h-[500px]'>
      {sliderImages.map((image, index) => (
        <img
          key={image}
          src={image}
          alt="slide"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out ${
            index === currentImageIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        />
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
        {sliderImages.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 w-3 rounded-full transition-all ${
              currentImageIndex === index ? 'bg-white' : 'bg-[#f3e4d6] hover:bg-[#fffaf4]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
