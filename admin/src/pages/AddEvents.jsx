import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';
import { backendUrl } from '../App';

const AddEvents = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });
  const [previews, setPreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/event/list`);

      if (response.data.success) {
        setEvents(response.data.events);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleImageChange = (event, key) => {
    const file = event.target.files[0];
    if (!file) return;

    setImages((prev) => ({ ...prev, [key]: file }));
    setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImages({
      image1: null,
      image2: null,
      image3: null,
      image4: null
    });
    setPreviews({
      image1: null,
      image2: null,
      image3: null,
      image4: null
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const selectedImages = Object.values(images).filter(Boolean);
    if (selectedImages.length !== 4) {
      toast.error('Please upload all 4 images');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      Object.entries(images).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(`${backendUrl}/api/event/add`, formData, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
        fetchEvents();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add Events</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create event cards with a title, description, and 4 images for the events page.
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Upload 4 Images</p>
          <div className="flex flex-wrap gap-3">
            {['image1', 'image2', 'image3', 'image4'].map((key) => (
              <label key={key} htmlFor={key} className="cursor-pointer">
                <img
                  src={previews[key] || assets.upload_area}
                  alt=""
                  className="h-24 w-24 rounded-lg border object-cover"
                />
                <input
                  id={key}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => handleImageChange(event, key)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-gray-700">Event Title</p>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full max-w-[520px] rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            required
          />
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-gray-700">Description</p>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-36 w-full max-w-[720px] rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white disabled:bg-gray-400"
        >
          {submitting ? 'Saving...' : 'Add Event'}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800">Existing Events</h3>
        {events.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            No events added yet.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((item) => (
              <div key={item._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <img
                  src={item.images?.[0] || assets.upload_area}
                  alt={item.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  <p className="mt-2 text-sm text-gray-500">
                    {item.description.length > 140
                      ? `${item.description.slice(0, 140)}...`
                      : item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

AddEvents.propTypes = {
  token: PropTypes.string.isRequired,
};

export default AddEvents;
