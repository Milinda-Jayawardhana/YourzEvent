import { useEffect, useMemo, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { getCategoryOptions, getSelectionForCategory } from '../utils/categoryHelpers';

const compressImage = async (file, maxSizeMB = 2, qualityTarget = 0.8) => {
  if (file.size / 1024 / 1024 < maxSizeMB) return file;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const originalSize = file.size / 1024 / 1024;
        let quality = qualityTarget;

        if (originalSize > 8) quality = 0.5;
        else if (originalSize > 5) quality = 0.6;
        else if (originalSize > 3) quality = 0.7;

        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const MAX_DIMENSION = 2000;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const aspectRatio = width / height;
          if (width > height) {
            width = MAX_DIMENSION;
            height = Math.round(width / aspectRatio);
          } else {
            height = MAX_DIMENSION;
            width = Math.round(height * aspectRatio);
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const newFile = new File([blob], file.name, { type: file.type });

          if (newFile.size / 1024 / 1024 > maxSizeMB && quality > 0.3) {
            compressImage(file, maxSizeMB, quality - 0.1).then(resolve);
          } else resolve(newFile);
        }, file.type, quality);
      };
    };
  });
};

const Add = ({ token }) => {
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
  const [compressing, setCompressing] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [majorCategory, setMajorCategory] = useState('Flower Bouquets');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [bestseller, setBestseller] = useState(false);

  const MAX_TOTAL_SIZE = 9;
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
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    let size = 0;
    if (image1) size += image1.size;
    if (image2) size += image2.size;
    if (image3) size += image3.size;
    if (image4) size += image4.size;

    setTotalSize(size / (1024 * 1024));
  }, [image1, image2, image3, image4]);

  useEffect(() => {
    if (!availableSubcategories.some((item) => item.name === subCategory)) {
      setSubCategory(availableSubcategories[0]?.name || '');
    }
  }, [availableSubcategories, subCategory]);

  const handleImageSelect = async (event, setImageFunction, key) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setCompressing(true);
      setDisplayImages((prev) => ({
        ...prev,
        [key]: URL.createObjectURL(file)
      }));

      const fileSize = file.size / 1024 / 1024;
      if (fileSize > 2) {
        const compressedFile = await compressImage(file, 2);
        setImageFunction(compressedFile);
      } else {
        setImageFunction(file);
      }
    } finally {
      setCompressing(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);
    setDisplayImages({
      image1: null,
      image2: null,
      image3: null,
      image4: null
    });
    setBestseller(false);

    const selection = getSelectionForCategory(categories);
    setCategory(selection.category);
    setSubCategory(selection.subCategory);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (totalSize > MAX_TOTAL_SIZE) {
      toast.error(`Total image size exceeds ${MAX_TOTAL_SIZE}MB`);
      return;
    }

    if (!category || !subCategory) {
      toast.error('Add categories and subcategories first');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('majorCategory', majorCategory);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('price', price);
    formData.append('bestseller', bestseller);

    image1 && formData.append('image1', image1);
    image2 && formData.append('image2', image2);
    image3 && formData.append('image3', image3);
    image4 && formData.append('image4', image4);

    try {
      const toastId = toast.loading('Adding product...');
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token }, timeout: 60000 }
      );

      if (response.data.success) {
        toast.update(toastId, {
          render: response.data.message,
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
        resetForm();
      } else {
        toast.update(toastId, {
          render: response.data.message,
          type: 'error',
          isLoading: false
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed!');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p>Upload Images {compressing && '(Processing...)'}</p>
        <div className="mt-2 flex gap-2">
          {['image1', 'image2', 'image3', 'image4'].map((key, index) => (
            <label key={key} htmlFor={key} className="cursor-pointer">
              <img
                className="h-20 w-20 border object-cover"
                src={displayImages[key] || assets.upload_area}
                alt=""
              />
              <input
                type="file"
                id={key}
                hidden
                accept="image/*"
                disabled={compressing}
                onChange={(event) =>
                  handleImageSelect(
                    event,
                    [setImage1, setImage2, setImage3, setImage4][index],
                    key
                  )
                }
              />
            </label>
          ))}
        </div>

        <p className={`text-sm ${totalSize > MAX_TOTAL_SIZE ? 'text-red-600' : 'text-gray-600'}`}>
          Total: {totalSize.toFixed(2)} MB / {MAX_TOTAL_SIZE} MB
        </p>
      </div>

      <div className="w-full">
        <p>Product Name</p>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          required
        />
      </div>

      <div className="w-full">
        <p>Product Description</p>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          required
        />
      </div>

      <div className="mt-3 flex w-full flex-col gap-5 sm:flex-row">
        <div>
          <p className="mb-2">Major Category</p>
          <select
            value={majorCategory}
            onChange={(event) => setMajorCategory(event.target.value)}
            className="px-3 py-2"
          >
            <option value="Flower Bouquets">Flower Bouquets</option>
            <option value="Gift Items">Gift Items</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Category</p>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="px-3 py-2"
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
          <p className="mb-2">Sub Category</p>
          <select
            value={subCategory}
            onChange={(event) => setSubCategory(event.target.value)}
            className="px-3 py-2"
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
          <p className="mb-2">Price</p>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            type="number"
            className="w-[120px] px-3 py-2"
            required
          />
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        <label>Add to BestSeller</label>
      </div>

      <button
        type="submit"
        className="mt-4 w-28 bg-black py-3 text-white disabled:bg-gray-400"
        disabled={compressing || !categories.length || !subCategory}
      >
        {compressing ? 'Processing...' : 'ADD'}
      </button>

      {!categories.length && (
        <p className="text-sm text-amber-600">
          Create at least one category and one subcategory from the Add Categories page first.
        </p>
      )}
    </form>
  );
};

export default Add;

Add.propTypes = {
  token: PropTypes.string.isRequired,
};
