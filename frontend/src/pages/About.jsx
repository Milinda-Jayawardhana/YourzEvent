import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className='pb-8'>
      <div className='border-t border-[#ead7c3] pt-8 text-center text-2xl'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col gap-16 rounded-[2rem] p-6 md:flex-row theme-surface'>
        <img className='w-full rounded-[1.75rem] md:max-w-[450px]' src='/s10.jpeg' alt="About Us" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 theme-section-copy'>
          <h2 className='theme-heading text-xl'>Who We Are</h2>
          <p>
            YourzEvents is a Dubai-based event planning and floral design service,
            specializing in creating unforgettable experiences through thoughtful
            design, seamless coordination, and elegant blooms. From intimate
            celebrations to large-scale corporate and social events, we bring
            visions to life with creativity, precision, and a deep understanding
            of style and detail.
          </p>
          <p>
            Our floral designs are curated to elevate every space, whether it is
            a wedding, brand launch, private party, or bespoke celebration. At
            YourzEvents, we believe every event should feel personal, purposeful,
            and beautifully executed.
          </p>

          <h2 className='theme-heading text-xl'>Our Mission</h2>
          <p>
            Our mission is to bring our clients&apos; visions to life through
            thoughtfully curated event design and floral artistry, creating
            seamless and personalized experiences with refined aesthetics.
          </p>

          <h2 className='theme-heading text-xl'>Our Vision</h2>
          <p>
            To become a leading event styling and floral design brand in Dubai and
            beyond through timeless design and emotional storytelling.
          </p>
        </div>
      </div>

      <div className='py-4 text-xl'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='mb-20 flex flex-col gap-5 text-sm md:flex-row'>
        <div className='theme-panel flex flex-col gap-5 rounded-[1.75rem] px-10 py-8 md:px-16 sm:py-20'>
          <b className='text-[#3f2d24]'>Fresh & Premium Quality Flowers :</b>
          <p className='theme-section-copy'>
            We provide only fresh, handpicked flowers sourced from trusted growers
            and premium farms. Every bouquet is carefully arranged by skilled
            florists to ensure beauty, fragrance, and long-lasting freshness.
          </p>
        </div>

        <div className='theme-panel flex flex-col gap-5 rounded-[1.75rem] px-10 py-8 md:px-16 sm:py-20'>
          <b className='text-[#3f2d24]'>Convenient Ordering & Fast Delivery :</b>
          <p className='theme-section-copy'>
            Our website is designed to make flower shopping simple and delightful,
            with beautiful bouquet previews, easy ordering, and reliable delivery
            for surprises, celebrations, and special moments.
          </p>
        </div>

        <div className='theme-panel flex flex-col gap-5 rounded-[1.75rem] px-10 py-8 md:px-16 sm:py-20'>
          <b className='text-[#3f2d24]'>Friendly Customer Support :</b>
          <p className='theme-section-copy'>
            Our support team is always ready to help, whether you need assistance
            choosing the perfect bouquet, customizing an arrangement, or tracking
            your delivery.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
