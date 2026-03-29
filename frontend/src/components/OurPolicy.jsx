import { assets } from '../assets/assets'


const OurPolicy = () => {
  return (
    <div className='my-10 flex flex-col justify-around gap-6 rounded-[2rem] px-6 py-10 text-center text-xs sm:flex-row sm:gap-4 sm:text-sm md:text-base theme-surface'>
        <div className='theme-panel rounded-[1.5rem] px-6 py-8'>
        <img src={assets.exchange_icon} className ='w-12 m-auto mb-5' alt=""/>
        <p className='font-semibold text-[#3f2d24]'>Easy Exchange Policy</p>

        <p className='theme-muted'>We offer hassle free exchange support for eligible orders.</p>
        </div>

        <div className='theme-panel rounded-[1.5rem] px-6 py-8'>
        <img src={assets.quality_icon} className ='w-12 m-auto mb-5' alt=""/>
        <p className='font-semibold text-[#3f2d24]'>7 Days Return Policy</p>

        <p className='theme-muted'>We provide a 7 day return window for qualifying purchases.</p>
        </div>

        <div className='theme-panel rounded-[1.5rem] px-6 py-8'>
        <img src={assets.support_img} className ='w-12 m-auto mb-5' alt=""/>
        <p className='font-semibold text-[#3f2d24]'>Best Customer Support</p>

        <p className='theme-muted'>We provide warm and responsive support whenever you need help.</p>
        </div>
      
            
    </div>
  )
}

export default OurPolicy
