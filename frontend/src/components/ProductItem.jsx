import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { BsCartPlus  } from "react-icons/bs";

const ProductItem = ({id, image, name, price, stockStatus}) => {
    const {currency} = useContext(ShopContext);

    // Function to determine badge styling for out of stock items
    const getBadgeStyle = () => {
        switch(stockStatus) {
            case 'Out of Stock':
                return 'bg-gray-500 text-white';
            case 'Limited Stock':
                return 'bg-orange-500 text-white';
            case 'In Stock':
                return 'bg-green-600 text-white';
            default:
                return 'bg-gray-600 text-white';
        }
    };

    return (
        <Link className='cursor-pointer text-[#4b362c]' to={`/product/${id}`}>
            {/* Fixed aspect ratio container */}
            <div className='relative w-full aspect-square overflow-hidden rounded-[1.5rem] border border-[#ead7c3] bg-[linear-gradient(180deg,rgba(255,250,244,0.96),rgba(247,235,220,0.78))]'>
                <img 
                    className='absolute inset-0 w-full h-full object-contain p-4 transition ease-in-out hover:scale-105' 
                    src={image[0]} 
                    alt={name}
                />
                
                {/* Stock Status Label - Bottom Right Corner of Image */}
                {stockStatus && (
                    <div className='absolute bottom-0 left-0 m-2 z-10'>
                        <span className={`text-xs font-medium px-2 py-1 inline-block rounded shadow-md ${getBadgeStyle()}`}>
                            {stockStatus}
                        </span>
                    </div>
                )}
                {/* Add to Cart button - Bottom Right Corner */}
                <div className="absolute bottom-2 right-2 z-10">
                    <ShopContext.Consumer>
                        {({ addToCart }) => (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (typeof addToCart === 'function') addToCart(id, 1);
                                }}
                                className={`flex items-center justify-center rounded-full border border-[#ad7a5f] bg-[#3f2d24] px-2.5 py-1.5 shadow-md transition-colors hover:bg-[#8f624b] ${stockStatus === 'Out of Stock' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                aria-label={`Add ${name} to cart`}
                                title="Add to cart"
                                disabled={stockStatus === 'Out of Stock'}
                            >
                                <BsCartPlus   className='w-4 text-white' alt="Add to cart"/>
                            </button>
                        )}
                    </ShopContext.Consumer>
                </div>

            </div>
            <div className='flex justify-between items-center pt-3 pb-1'>
                <p className='text-sm text-[#5d4639]'>{name}</p>
                <p className='text-sm font-medium text-[#3f2d24]'>{currency}{price}</p>
            </div>
        </Link>
    )
}

export default ProductItem

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    stockStatus: PropTypes.string
}
