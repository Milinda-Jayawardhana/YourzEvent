import { useRef, useState } from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import emailjs from '@emailjs/browser'

const faqs = [
  {
    question: 'What are your shipping options?',
    answer:
      'We offer standard shipping, express shipping, and international delivery options. Shipping costs vary based on your location and selected method.'
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order is shipped, you will receive a confirmation email with tracking details so you can follow the delivery progress.'
  },
  {
    question: 'What is your return policy?',
    answer:
      'We accept returns within 30 days of purchase for eligible items in their original condition. Please contact our support team to begin the process.'
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship to most countries worldwide. Delivery times and rates vary depending on destination.'
  }
]

const socialButtonClass = 'rounded-full bg-[#f7ecdf] p-3 transition-colors hover:bg-[#ead7c3]'

const Contact = () => {
  const form = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    emailjs.sendForm(
      'service_bmwxgww',
      'template_tbyz2d8',
      form.current,
      'INIKYQWseQGwbV8y8'
    )
      .then(() => {
        setLoading(false)
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      })
      .catch(() => {
        setLoading(false)
        setStatus('error')
      })
  }

  return (
    <div className="pb-8">
      <div className='border-t border-[#ead7c3] pt-10 text-center text-2xl'>
        <Title text1={'CONTACT'} text2={'US'} />
        <p className="mx-auto mt-4 max-w-2xl px-4 theme-section-copy">
          We would love to hear from you. Whether you have a question about our
          bouquets, deliveries, custom arrangements, or event styling, our team
          is ready to help.
        </p>
      </div>

      <div className='mx-auto my-10 mb-28 flex max-w-6xl flex-col justify-center gap-10 px-4 md:flex-row'>
        <div className="flex w-full flex-col gap-6 md:w-1/2">
          <img
            src="/s5.jpeg"
            alt="YourzEvents floral display"
            className='w-full rounded-[1.75rem] shadow-[0_20px_60px_rgba(138,94,76,0.14)]'
          />

          <div className='theme-panel rounded-[1.75rem] p-6'>
            <h2 className='theme-heading mb-4 border-b border-[#ead7c3] pb-3 text-xl'>Visit Our Store</h2>
            <div className='flex flex-col gap-4'>
              <div className='flex items-start gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-5 w-5 text-[#8f624b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className='theme-section-copy'>
                  <span className='font-medium text-[#3f2d24]'>Phone:</span><br />
                  +971 58 304 8569
                </p>
              </div>

              <div className='flex items-start gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-5 w-5 text-[#8f624b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className='theme-section-copy'>
                  <span className='font-medium text-[#3f2d24]'>Email:</span><br />
                  yourzevents1@gmail.com
                </p>
              </div>

              <div className='flex items-start gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-5 w-5 text-[#8f624b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className='theme-section-copy'>
                  <span className='font-medium text-[#3f2d24]'>Working Hours:</span><br />
                  24 Hours
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="theme-panel rounded-[1.75rem] p-6">
            <h2 className='theme-heading mb-4 border-b border-[#ead7c3] pb-3 text-xl'>Send Us a Message</h2>
            <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#6f5648]">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#d9c5b1] bg-white px-3 py-2 text-[#3f2d24] focus:outline-none focus:ring-2 focus:ring-[#d7b69f]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#6f5648]">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#d9c5b1] bg-white px-3 py-2 text-[#3f2d24] focus:outline-none focus:ring-2 focus:ring-[#d7b69f]"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-[#6f5648]">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#d9c5b1] bg-white px-3 py-2 text-[#3f2d24] focus:outline-none focus:ring-2 focus:ring-[#d7b69f]"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-[#6f5648]">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full rounded-xl border border-[#d9c5b1] bg-white px-3 py-2 text-[#3f2d24] focus:outline-none focus:ring-2 focus:ring-[#d7b69f]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`theme-button-primary mt-2 flex items-center justify-center rounded-full px-4 py-3 tracking-[0.18em] ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="mt-3 rounded-md bg-green-100 p-3 text-green-700">
                  Thank you for your message! We&apos;ll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="mt-3 rounded-md bg-red-100 p-3 text-red-700">
                  Failed to send message. Please try again later or contact us directly.
                </div>
              )}
            </form>
          </div>

          <div className="my-6"></div>

          <div className="theme-panel rounded-[1.75rem] p-6">
            <h2 className='theme-heading mb-4 border-b border-[#ead7c3] pb-3 text-xl'>Connect With Us</h2>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1H3mRACwCD/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6f5648]">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/yourzevents?igsh=MTBlbWR6d2N3enRzNw==" target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6f5648]">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37a4 4 0 1 1-7.94 1.68 4 4 0 0 1 7.94-1.68z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/yourzbyjayevents/" target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#6f5648]">
                  <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.9-2 3.9-2 4.2 0 5 2.8 5 6.4V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9z" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@yourz.events?_r=1&_t=ZN-93FbDOu8FaY" target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="currentColor" className="text-[#6f5648]">
                  <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.2v178.7a162.6 162.6 0 1 1-141.1-161.5v89.3a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2 122.2 122.2 0 0 0 54.2 80.5A121.4 121.4 0 0 0 448 124z" />
                </svg>
              </a>
              <a href="https://youtube.com/@yourzevents?si=eGgFt-O_hyB3A9II" target="_blank" rel="noopener noreferrer" className={socialButtonClass}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 576 512" fill="currentColor" className="text-[#6f5648]">
                  <path d="M549.655 124.083c-6.281-23.65-24.85-42.027-48.545-48.333C458.353 64 288 64 288 64s-170.353 0-213.11 11.75c-23.695 6.307-42.264 24.683-48.545 48.333C16 166.842 16 256 16 256s0 89.158 10.345 131.917c6.281 23.65 24.85 42.027 48.545 48.333C117.647 448 288 448 288 448s170.353 0 213.11-11.75c23.695-6.307 42.264-24.683 48.545-48.333C560 345.158 560 256 560 256s0-89.158-10.345-131.917zM232 334V178l142 78-142 78z"/>
                </svg>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=yourzevents1@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gmail"
                className={socialButtonClass}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#6f5648]"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(247,235,220,0.75))] px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="theme-heading mb-8 text-center text-2xl">Frequently Asked Questions</h2>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="theme-panel rounded-[1.25rem] p-4 transition-shadow hover:shadow-md">
                <h3 className="mb-2 text-lg font-medium text-[#3f2d24]">{faq.question}</h3>
                <p className="theme-section-copy">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact
