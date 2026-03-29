import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import PropTypes from 'prop-types';

const Collection = ({ title1 = 'ALL', title2 = 'ITEMS' }) => {
  const { products, categories, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const [openCategories, setOpenCategories] = useState([]);

  const toggleCategoryOpen = (index) => {
    if (openCategories.includes(index)) {
      setOpenCategories((prev) => prev.filter((item) => item !== index));
    } else {
      setOpenCategories((prev) => [...prev, index]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const selectSubCategory = (subName) => {
    if (subCategory.includes(subName)) {
      setSubCategory((prev) => prev.filter((item) => item !== subName));
    } else {
      setSubCategory((prev) => [...prev, subName]);
    }
  };

  const sortProduct = () => {
    let filteredProductsCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(filteredProductsCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(filteredProductsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col gap-1 pt-10 sm:gap-10 md:flex-row'>
      <div className='min-w-44 lg:min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 flex cursor-pointer items-center gap-1 text-xl'
        >
          FILTERS
          <img
            className={`h-3 transition md:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
          />
        </p>

        <div className={`mt-6 border border-gray-300 py-3 pl-4 ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          {categories.length === 0 ? (
            <p className='pr-4 text-xs text-gray-500'>No categories available yet.</p>
          ) : (
            <div className='flex flex-col gap-2'>
              {categories.map((cat, index) => (
                <div key={cat._id || index}>
                  <div
                    onClick={() => toggleCategoryOpen(index)}
                    className='flex cursor-pointer select-none items-center justify-between text-sm font-medium text-gray-800'
                  >
                    <span>{cat.name}</span>
                  </div>

                  {openCategories.includes(index) && (
                    <div className='ml-4 mt-2 flex flex-col gap-1'>
                      {(cat.subcategories || []).map((sub) => (
                        <label
                          key={sub._id || sub.name}
                          className='flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-xs text-gray-600 hover:bg-gray-100'
                        >
                          <input
                            type='checkbox'
                            checked={subCategory.includes(sub.name)}
                            onChange={() => selectSubCategory(sub.name)}
                          />
                          {sub.name}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='flex-1'>
        <div className='mb-4 flex justify-between text-base sm:text-2xl'>
          <Title text1={title1} text2={title2} />

          <select
            onChange={(event) => setSortType(event.target.value)}
            className='border-2 border-gray-300 px-2 text-sm'
          >
            <option value='relavent'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              image={item.image}
              price={item.price}
              stockStatus={item.stockStatus}
              stock={item.stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

Collection.propTypes = {
  title1: PropTypes.string,
  title2: PropTypes.string,
};
