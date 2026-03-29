import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
  return (
    <div className='pb-12'>
      <Hero />
      <div className='py-10'><div className='theme-button-primary w-60% h-2 rounded-full'></div></div>
      
      <LatestCollection />
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
    
    </div>
   
  )
}

export default Home
