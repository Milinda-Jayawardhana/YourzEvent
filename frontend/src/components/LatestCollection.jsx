import {useContext} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useEffect, useState } from 'react';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])


  return (
    <section className='relative my-14'>
        <div className='pointer-events-none absolute inset-x-10 top-6 h-28 rounded-full bg-[radial-gradient(circle,rgba(234,215,195,0.38),transparent_72%)] blur-3xl' />
        <div className='relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-[linear-gradient(180deg,rgba(255,250,244,0.5),rgba(255,250,244,0.14))] px-4 py-6 shadow-[0_18px_45px_rgba(138,94,76,0.04)] backdrop-blur-[2px] sm:px-6'>
            <div className='mx-auto mb-3 h-px w-20 bg-[linear-gradient(90deg,transparent,#cfa78e,transparent)]' />
            <div className='text-center py-8 text-3xl'>
                <Title text1 ={'LATEST '} text2={'COLLECTION'}/>
                <p className='w-3/4 m-auto text-xs sm:text-base theme-section-copy'>Brighten your day with the latest bouquets and curated gift-ready floral pieces.</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
              latestProducts.map((item,index) => (
                <ProductItem 
                  key={index} 
                  id={item._id} 
                  image={item.image} 
                  name={item.name} 
                  price={item.price} 
                  stock={item.stock}
                  stockStatus={item.stockStatus}
                />
              ))
            }
            </div>
        </div>
    </section>
  
    
  )
}

export default LatestCollection
