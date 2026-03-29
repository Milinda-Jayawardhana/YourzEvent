import { assets } from '../assets/assets'

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Flower Bouquets', href: '/services/floral-arrangements/flower-bouquets' }
]

const policyLinks = [
  { label: 'Terms and Conditions', href: '/terms-and-conditions' },
  { label: 'Privacy Policy', href: '/privacy-and-policy' },
  { label: 'Return Policy', href: '/return-policy' },
  { label: 'Contact Us', href: '/contact' }
]

const socialLinks = [
  {
    href: 'https://www.facebook.com/share/1H3mRACwCD/?mibextid=wwXIfr',
    label: 'Facebook',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    )
  },
  {
    href: 'https://www.instagram.com/yourzevents?igsh=MTBlbWR6d2N3enRzNw==',
    label: 'Instagram',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37a4 4 0 1 1-7.94 1.68 4 4 0 0 1 7.94-1.68z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    href: 'https://www.tiktok.com/@yourz.events?_r=1&_t=ZN-93FbDOu8FaY',
    label: 'TikTok',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 448 512" fill="currentColor">
        <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.2v178.7a162.6 162.6 0 1 1-141.1-161.5v89.3a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2 122.2 122.2 0 0 0 54.2 80.5A121.4 121.4 0 0 0 448 124z" />
      </svg>
    )
  },
  {
    href: 'https://youtube.com/@yourzevents?si=eGgFt-O_hyB3A9II',
    label: 'YouTube',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 576 512" fill="currentColor">
        <path d="M549.655 124.083c-6.281-23.65-24.85-42.027-48.545-48.333C458.353 64 288 64 288 64s-170.353 0-213.11 11.75c-23.695 6.307-42.264 24.683-48.545 48.333C16 166.842 16 256 16 256s0 89.158 10.345 131.917c6.281 23.65 24.85 42.027 48.545 48.333C117.647 448 288 448 288 448s170.353 0 213.11-11.75c23.695-6.307 42.264-24.683 48.545-48.333C560 345.158 560 256 560 256s0-89.158-10.345-131.917zM232 334V178l142 78-142 78z"/>
      </svg>
    )
  },
  {
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=yourzevents1@gmail.com',
    label: 'Gmail',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  }
]

const Footer = () => {
  return (
    <footer className='mt-12 rounded-t-[2.25rem] border border-[#ead7c3] bg-[linear-gradient(180deg,rgba(255,250,244,0.92),rgba(243,228,214,0.92))] px-5 pt-6 sm:px-6'>
      <div className='grid gap-6 border-b border-[#d9c5b1] pb-5 sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-8'>
        <div className='pr-0 sm:pr-8'>
          <img src="/logo.jpeg" alt="Logo" className='mb-3 w-24' />
          <p className='text-sm leading-6 theme-section-copy'>
            Blooming Emotions, One Bouquet at a Time.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-5 sm:col-span-2'>
          <div>
            <p className='theme-heading mb-3 text-base'>Company</p>
            <ul className='space-y-1.5 text-sm theme-section-copy'>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-[#3f2d24]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='theme-heading mb-3 text-base'>Policies & Contact</p>
            <ul className='space-y-1.5 text-sm theme-section-copy'>
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-[#3f2d24]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='sm:col-span-3'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <p className='theme-heading text-base'>Get In Touch</p>
            <div className="flex flex-wrap gap-3 text-[#6f5648]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-full border border-[#d9c5b1] bg-white/70 p-2.5 transition-colors hover:bg-white hover:text-[#3f2d24]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left'>
        <p className='text-sm theme-section-copy'>Copyright 2026@YourzEvents - All Rights Reserved.</p>
        <div className='flex items-center justify-center gap-2 sm:justify-end'>
          <span className='text-xs theme-section-copy'>Powered by</span>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shehanj809@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={assets.company}
              alt="Company Logo"
              className="h-5 w-auto cursor-pointer transition-opacity hover:opacity-80"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
