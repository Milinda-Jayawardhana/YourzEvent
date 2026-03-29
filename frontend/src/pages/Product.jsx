import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
      return null;
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const renderStockStatus = () => {
    if (!productData.stockStatus) return null;

    const statusColor = {
      'In Stock': 'text-gray-600',
      'Out of Stock': 'text-gray-600',
      'Limited Stock': 'text-orange-500'
    };

    return (
      <div className="mt-3">
        <span className={`font-medium ${statusColor[productData.stockStatus]}`}>
          {productData.stockStatus}
        </span>
      </div>
    );
  };

  const handleAddToCart = () => {
    addToCart(productData._id);
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-start sm:justify-start gap-2 sm:gap-3 sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                className='w-[24%] sm:w-full flex-shrink-0 cursor-pointer'
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
          {renderStockStatus()}

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {productData.description}
          </p>

          <button
            onClick={handleAddToCart}
            className={`${
              productData.stockStatus === 'Out of Stock'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black active:bg-gray-700'
            } text-white px-8 py-3 text-sm mt-6`}
            disabled={productData.stockStatus === 'Out of Stock'}
          >
            {productData.stockStatus === 'Out of Stock' ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash On delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>;
};

export default Product;
