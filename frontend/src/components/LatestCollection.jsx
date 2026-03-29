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
    <div className='my-10 rounded-[2rem] px-4 py-6 sm:px-6 theme-surface'>
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
  
    
  )
}

export default LatestCollection
