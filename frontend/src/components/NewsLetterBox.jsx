import { useState } from 'react'
import emailjs from '@emailjs/browser'

const NewsLetterBox = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const onSubmitHandler = (event) => {
    event.preventDefault()

    const templateParams = {
      email: email, // Must match variable name in your EmailJS template
    }

    console.log("Sending email with params:", templateParams)

    emailjs.send(
      'service_bmwxgww',       // Your EmailJS service ID
      'template_2hubfvb',      // Your EmailJS template ID
      templateParams,
      'INIKYQWseQGwbV8y8'      // Your EmailJS public key
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text)
      setStatus('🎉 Subscribed successfully!')
      setEmail('')
      setError('')
    })
    
    .catch((error) => {
      console.error('FAILED...', error)
      setStatus('')
      setError('❌ Failed to subscribe. Please try again.')
    })
  }

  return (
    <div className='rounded-[2rem] px-6 py-10 text-center theme-surface'>
      <p className='theme-subheading text-xs sm:text-sm'>Stay in Bloom</p>
      <p className='theme-heading mt-3 text-2xl sm:text-3xl'>Subscribe Now to Our Newsletter</p>
      <p className='theme-section-copy mt-3'>
        Get E-mail updates about our latest shop and special offers.
      </p>
      <form onSubmit={onSubmitHandler} className='mx-auto my-6 flex w-full items-center gap-3 rounded-full border border-[#d9c5b1] bg-white/90 p-2 pl-4 sm:w-1/2'>
        <input
          className='w-full bg-transparent text-[#6f5648] outline-none sm:flex-1'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Your Email'
          required
        />
        <button type='submit' className='theme-button-primary rounded-full px-6 py-3 text-xs tracking-[0.24em]'>SUBSCRIBE</button>
      </form>
      {status && <p className='text-sm text-green-600 mt-2'>{status}</p>}
      {error && <p className='text-sm text-red-600 mt-2'>{error}</p>}
    </div>
  )
}

export default NewsLetterBox
