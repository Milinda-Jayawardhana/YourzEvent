import { useEffect, useMemo, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategoryOptions, getSelectionForCategory } from '../utils/categoryHelpers';

const Edit = ({ token }) => {
  const { id } = useParams();
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [displayImages, setDisplayImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const availableSubcategories = useMemo(() => {
    const selectedCategory = categories.find((item) => item.name === category);
    return selectedCategory?.subcategories || [];
  }, [categories, category]);

  const fetchCategories = async (currentCategory = '', currentSubCategory = '') => {
    try {
      const response = await axios.get(`${backendUrl}/api/category/list`);

      if (response.data.success) {
        const categoryOptions = getCategoryOptions(response.data.categories);
        setCategories(categoryOptions);

        const selection = getSelectionForCategory(
          categoryOptions,
          currentCategory,
          currentSubCategory
        );
        setCategory(selection.category);
        setSubCategory(selection.subCategory);
      }
    } catch (fetchError) {
      console.error('Fetch categories error:', fetchError);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const baseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;
        const response = await axios.get(`${baseUrl}api/product/${id}`, {
          headers: { token }
        });

        const product = response.data.product;

        if (product) {
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setSizes(product.sizes || []);
          setBestseller(product.bestseller);
          await fetchCategories(product.category, product.subCategory);
          setDisplayImages({
            image1: product.image?.[0] || null,
            image2: product.image?.[1] || null,
            image3: product.image?.[2] || null,
            image4: product.image?.[3] || null
          });
          setLoading(false);
        } else {
          throw new Error('Product not found');
        }
      } catch (fetchError) {
        console.error('Fetch product error:', fetchError);
        setError(fetchError.response?.data?.message || 'Failed to load product');
        toast.error(fetchError.response?.data?.message || 'Failed to load product');
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, token]);

  useEffect(() => {
    if (!availableSubcategories.some((item) => item.name === subCategory)) {
      setSubCategory(availableSubcategories[0]?.name || '');
    }
  }, [availableSubcategories, subCategory]);

  const handleImageSelect = (event, imageNumber) => {
    const file = event.target.files[0];
    if (!file) return;

    const setters = {
      1: setImage1,
      2: setImage2,
      3: setImage3,
      4: setImage4
    };

    setters[imageNumber](file);
    const imageKey = `image${imageNumber}`;
    setDisplayImages((prev) => ({
      ...prev,
      [imageKey]: URL.createObjectURL(file)
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('price', price);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestseller', bestseller);

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const toastId = toast.loading('Updating product...');
      const baseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;
      const response = await axios.put(`${baseUrl}api/product/${id}`, formData, {
        headers: { token }
      });

      if (response.data.success) {
        toast.update(toastId, {
          render: response.data.message,
          type: 'success',
          isLoading: false,
          autoClose: 5000
        });
      } else {
        toast.update(toastId, {
          render: response.data.message,
          type: 'error',
          isLoading: false,
          autoClose: 5000
        });
      }
    } catch (submitError) {
      console.error('Update product error:', submitError);
      toast.error(submitError.response?.data?.message || 'Failed to update product');
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center">Loading product data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Edit Images</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((imageNumber) => (
            <label htmlFor={`image${imageNumber}`} key={imageNumber} className="cursor-pointer">
              <img
                className="h-20 w-20 object-cover border"
                src={displayImages[`image${imageNumber}`] || assets.upload_area}
                alt=""
              />
              <input
                onChange={(event) => handleImageSelect(event, imageNumber)}
                type="file"
                id={`image${imageNumber}`}
                hidden
                accept="image/*"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p>Product Name</p>
        <input
          onChange={(event) => setName(event.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          required
        />
      </div>

      <div className="w-full">
        <p>Product Description</p>
        <textarea
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          required
        />
      </div>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(event) => setCategory(event.target.value)}
            value={category}
            className="w-full max-w-[500px] px-3 py-2"
            required
            disabled={!categories.length}
          >
            {categories.length === 0 ? (
              <option value="">No categories available</option>
            ) : (
              categories.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <p className="mb-2">Product SubCategory</p>
          <select
            onChange={(event) => setSubCategory(event.target.value)}
            value={subCategory}
            className="w-full max-w-[500px] px-3 py-2"
            required
            disabled={!availableSubcategories.length}
          >
            {availableSubcategories.length === 0 ? (
              <option value="">No subcategories available</option>
            ) : (
              availableSubcategories.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(event) => setPrice(event.target.value)}
            value={price}
            className="w-full max-w-[180px] px-2 py-2"
            type="number"
            placeholder="0"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${sizes.includes(size) ? 'bg-blue-200' : 'bg-slate-200'} cursor-pointer px-3 py-1`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to BestSeller
        </label>
      </div>

      <button type="submit" className="mt-4 w-28 bg-black py-3 text-white">
        Update
      </button>
    </form>
  );
};

export default Edit;

Edit.propTypes = {
  token: PropTypes.string.isRequired,
};
