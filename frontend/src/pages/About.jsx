import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src='/s10.jpeg' alt="About Us" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>

          <h2 className='text-xl font-semibold text-gray-800'>Who We Are</h2>
          <p>
            YourzEvents is a Dubai-based event planning and floral design
            service, specializing in creating unforgettable experiences through
            thoughtful design, seamless coordination, and elegant blooms.
            From intimate celebrations to large-scale corporate and social
            events, we bring visions to life with creativity, precision, and a
            deep understanding of style and detail. Our floral designs are
            curated to elevate every space, whether it’s a wedding, brand
            launch, private party, or bespoke celebration. At YourzEvents, we
            believe every event should feel personal, purposeful, and
            beautifully executed. From concept to completion, we handle
            every detail so our clients can simply enjoy the moment.
          </p>

          <h2 className='text-xl font-semibold text-gray-800'>Our Mission</h2>
          <p>
            Our mission at YourzEvents is to bring
            our clients’ visions to life through
            thoughtfully curated event design and
            floral artistry. We create seamless,
            personalized experiences by
            combining creativity, precision, and
            refined aesthetics
          </p>

          <h2 className='text-xl font-semibold text-gray-800'>Our Vision</h2>
          <p>
            To become a leading event styling and
            floral design brand in Dubai and
            beyond, through timeless design and
            emotional storytelling
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Trusted Quality Components :</b>
          <p className='text-gray-600'>
            We provide only authentic and reliable components sourced from reputable
            manufacturers. Every product is carefully inspected to ensure it meets
            industry standards—giving you the confidence to build robust and durable
            electronic solutions.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience & Fast Delivery :</b>
          <p className='text-gray-600'>
            Our website is designed to make component shopping simple and fast. With
            clear product descriptions, easy navigation, and speedy shipping, you can
            get the parts you need without delays—perfect for urgent projects and
            deadlines.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Expert Customer Support :</b>
          <p className='text-gray-600'>
            Our technical support team is always ready to help—whether you need
            assistance choosing the right microcontroller, checking compatibility, or
            tracking your order. We are committed to providing friendly and reliable
            support to make your experience smooth and worry-free.
          </p>
        </div>

      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
