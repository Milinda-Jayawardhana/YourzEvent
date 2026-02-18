import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text-sm'>
        <div>
          <img src="/logo.jpeg" alt="Logo" className='mb-5 w-32' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Blooming Emotions, One Bouquet at a Time.
          </p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><a href="/" className="hover:text-gray-900 transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-gray-900 transition-colors">About Us</a></li>
            <li><a href="/terms-and-conditions" className="hover:text-gray-900 transition-colors">Terms and Conditions</a></li>
            <li><a href="/privacy-and-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
            <li><a href="/return-policy" className="hover:text-gray-900 transition-colors">Return Policy</a></li>


            <li><a href="/contact" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>


          <div className="flex gap-4 mt-6">
            {/* Facebook Icon */}
            <a href="https://www.facebook.com/share/1H3mRACwCD/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-600 hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* Instagram Icon */}
            <a href="https://www.instagram.com/yourzevents?igsh=MTBlbWR6d2N3enRzNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-600 hover:text-pink-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37a4 4 0 1 1-7.94 1.68 4 4 0 0 1 7.94-1.68z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* TikTok Icon */}
            <a href="https://www.tiktok.com/@yourz.events?_r=1&_t=ZN-93FbDOu8FaY" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-600 hover:text-cyan-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none">
                <path d="M32 12h-4v16.8c0 2.2.8 4.2 2.2 5.8 1.5 1.7 3.6 2.6 5.8 2.6 4.4 0 8-3.6 8-8V22h-4v6.6c0 2.2-1.8 4-4 4-1.1 0-2.1-.4-2.9-1.1-1.7-1.4-2.9-3.5-2.9-5.9V12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 24c-4.4 0-8-3.6-8-8s3.6-8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            {/* YouTube Icon */}
            <a href="https://youtube.com/@yourzevents?si=eGgFt-O_hyB3A9II" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-600 hover:text-red-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 576 512" fill="currentColor">
                <path d="M549.655 124.083c-6.281-23.65-24.85-42.027-48.545-48.333C458.353 64 288 64 288 64s-170.353 0-213.11 11.75c-23.695 6.307-42.264 24.683-48.545 48.333C16 166.842 16 256 16 256s0 89.158 10.345 131.917c6.281 23.65 24.85 42.027 48.545 48.333C117.647 448 288 448 288 448s170.353 0 213.11-11.75c23.695-6.307 42.264-24.683 48.545-48.333C560 345.158 560 256 560 256s0-89.158-10.345-131.917zM232 334V178l142 78-142 78z"/>
              </svg>
            </a>

            {/* Gmail Icon */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=yourzevents1@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gmail"
              className="text-gray-600 hover:text-red-600 transition-colors"
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
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>


          </div>
        </div>
      </div>
      <div>
        <hr />
        <div className='flex justify-between items-center py-5 pr-16 sm:pr-4'>
          <p className='text-sm text-center flex-1'>Copyright 2026@YourzEvents - All Rights Reserved.</p>
          <div className='flex flex-col items-center gap-1'>
            <span className='text-xs text-gray-600'>Powered by</span>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kausuru23@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={assets.company}
                alt="Company Logo"
                className="h-5 w-auto hover:opacity-80 transition-opacity cursor-pointer"
              />
            </a>

          </div>
        </div>
      </div>
      <div>
        <hr />

      </div>
    </div>
  )
}

export default Footer