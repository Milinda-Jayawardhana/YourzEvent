import {useContext} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useEffect, useState } from 'react';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestproduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestproduct.slice(0, 5));
    }, [products])

    return (
        <section className='relative my-14'>
            <div className='pointer-events-none absolute inset-x-10 top-6 h-28 rounded-full bg-[radial-gradient(circle,rgba(234,215,195,0.34),transparent_72%)] blur-3xl' />
            <div className='relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-[linear-gradient(180deg,rgba(255,250,244,0.48),rgba(255,250,244,0.12))] px-4 py-6 shadow-[0_18px_45px_rgba(138,94,76,0.04)] backdrop-blur-[2px] sm:px-6'>
                <div className='mx-auto mb-3 h-px w-20 bg-[linear-gradient(90deg,transparent,#cfa78e,transparent)]' />
                <div className='text-center py-8 text-3xl'>
                    <Title text1={'BEST'} text2={'SELLERS'}/>
                    <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base theme-section-copy'>
                        Customer favorites chosen for heartfelt gifting and beautiful floral moments.
                    </p>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {
                        bestSeller.map((item, index) => (
                            <ProductItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                image={item.image} 
                                price={item.price}
                                stockStatus={item.stockStatus}
                                stock={item.stock}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default BestSeller
