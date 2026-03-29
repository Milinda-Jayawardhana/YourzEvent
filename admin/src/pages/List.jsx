import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateStock = async (productId, newStatus) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const response = await axios.post(
        backendUrl + '/api/product/updateStockStatus',
        { productId, stockStatus: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateBestSeller = async (productId, isBestSeller) => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const response = await axios.post(
        backendUrl + '/api/product/updateBestSeller',
        { productId, bestseller: !isBestSeller },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const stockOptions = ['In Stock', 'Out of Stock', 'Limited Stock'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-500';
      case 'Out of Stock':
        return 'bg-red-500';
      case 'Limited Stock':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <p className='mb-2 text-lg font-semibold'>All Product List</p>

      <input
        type='text'
        placeholder='Search by name or category...'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className='mb-3 w-full rounded border p-2'
      />

      <div className='flex flex-col gap-2'>
        <div className='hidden grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center border bg-gray-100 px-2 py-1 text-sm md:grid'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Best Seller</b>
          <b className='text-center'>Stock Status</b>
          <b className='text-center'>Edit</b>
          <b className='text-center'>Delete</b>
        </div>

        {filteredList.map((item) => (
          <div
            key={item._id}
            className='grid grid-cols-[1fr_3fr_1fr] items-center gap-2 border px-2 py-1 text-sm md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr]'
          >
            <img className='w-12' src={item.image[0]} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>

            <div className='flex justify-center'>
              <button
                onClick={() => updateBestSeller(item._id, item.bestseller)}
                className={`relative h-6 w-12 rounded-full transition-colors ${
                  item.bestseller ? 'bg-green-500' : 'bg-gray-300'
                }`}
                disabled={isUpdating}
              >
                <span
                  className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    item.bestseller ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className='text-right md:text-center'>
              <select
                value={item.stockStatus}
                onChange={(event) => updateStock(item._id, event.target.value)}
                className={`cursor-pointer rounded px-2 py-1 text-white ${getStatusColor(item.stockStatus)}`}
                disabled={isUpdating}
              >
                {stockOptions.map((option) => (
                  <option key={option} value={option} className='bg-white text-gray-800'>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className='text-right md:text-center'>
              <button
                type='button'
                onClick={() => navigate(`/edit/${item._id}`)}
                className='rounded bg-black px-3 py-1 text-xs text-white'
              >
                Edit
              </button>
            </div>

            <p
              onClick={() => removeProduct(item._id)}
              className='cursor-pointer text-right text-lg text-red-500 md:text-center'
            >
              X
            </p>
          </div>
        ))}

        {filteredList.length === 0 && (
          <div className='py-4 text-center text-gray-500'>
            No products match your search
          </div>
        )}
      </div>
    </>
  );
};

List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List;
