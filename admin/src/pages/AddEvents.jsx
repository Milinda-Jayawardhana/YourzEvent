import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';
import { backendUrl } from '../App';

const emptyImages = {
  image1: null,
  image2: null,
  image3: null,
  image4: null
};

const emptyPreviews = {
  image1: null,
  image2: null,
  image3: null,
  image4: null
};

const AddEvents = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState(emptyImages);
  const [previews, setPreviews] = useState(emptyPreviews);
  const [editingEventId, setEditingEventId] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [editingExistingImages, setEditingExistingImages] = useState([]);
  const [editingNewImages, setEditingNewImages] = useState(emptyImages);
  const [editingNewPreviews, setEditingNewPreviews] = useState(emptyPreviews);

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

  const handleImageChange = (event, key, isEditing = false) => {
    const file = event.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (isEditing) {
      setEditingNewImages((prev) => ({ ...prev, [key]: file }));
      setEditingNewPreviews((prev) => ({ ...prev, [key]: previewUrl }));
      return;
    }

    setImages((prev) => ({ ...prev, [key]: file }));
    setPreviews((prev) => ({ ...prev, [key]: previewUrl }));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImages(emptyImages);
    setPreviews(emptyPreviews);
  };

  const resetEditState = () => {
    setEditingEventId('');
    setEditingTitle('');
    setEditingDescription('');
    setEditingExistingImages([]);
    setEditingNewImages(emptyImages);
    setEditingNewPreviews(emptyPreviews);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const selectedImages = Object.values(images).filter(Boolean);
    if (selectedImages.length < 1) {
      toast.error('Please upload at least one image');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      Object.entries(images).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
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

  const startEdit = (eventItem) => {
    setEditingEventId(eventItem._id);
    setEditingTitle(eventItem.title);
    setEditingDescription(eventItem.description);
    setEditingExistingImages(eventItem.images || []);
    setEditingNewImages(emptyImages);
    setEditingNewPreviews(emptyPreviews);
  };

  const removeExistingImage = (index) => {
    setEditingExistingImages((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const saveEdit = async () => {
    const newUploads = Object.values(editingNewImages).filter(Boolean);
    const finalCount = editingExistingImages.length + newUploads.length;

    if (finalCount < 1) {
      toast.error('Keep at least one image for the event');
      return;
    }

    if (finalCount > 4) {
      toast.error('You can keep only up to 4 images for an event');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('title', editingTitle);
      formData.append('description', editingDescription);
      formData.append('existingImages', JSON.stringify(editingExistingImages));

      Object.entries(editingNewImages).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      const response = await axios.put(`${backendUrl}/api/event/${editingEventId}`, formData, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        resetEditState();
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

  const deleteEvent = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/event/${id}`, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        if (editingEventId === id) {
          resetEditState();
        }
        fetchEvents();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add Events</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create event cards with a title, description, and 1 to 4 images for the events page.
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Upload Images</p>
          <p className="mb-3 text-xs text-gray-500">You can add 1 to 4 images.</p>
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
            {events.map((item) => {
              const isEditing = editingEventId === item._id;

              return (
                <div key={item._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <img
                    src={item.images?.[0] || assets.upload_area}
                    alt={item.title}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-4">
                    {isEditing ? (
                      <>
                        <input
                          value={editingTitle}
                          onChange={(event) => setEditingTitle(event.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                        />
                        <textarea
                          value={editingDescription}
                          onChange={(event) => setEditingDescription(event.target.value)}
                          className="mt-3 min-h-28 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                        />

                        <div className="mt-4">
                          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                            Current Images
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {editingExistingImages.map((image, index) => (
                              <div key={`${image}-${index}`} className="relative">
                                <img
                                  src={image}
                                  alt=""
                                  className="h-16 w-16 rounded-lg border object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeExistingImage(index)}
                                  className="absolute -right-2 -top-2 rounded-full bg-black px-1.5 py-0.5 text-[10px] text-white"
                                >
                                  x
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                            Add More Images
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {['image1', 'image2', 'image3', 'image4'].map((key) => (
                              <label key={key} htmlFor={`edit-${item._id}-${key}`} className="cursor-pointer">
                                <img
                                  src={editingNewPreviews[key] || assets.upload_area}
                                  alt=""
                                  className="h-16 w-16 rounded-lg border object-cover"
                                />
                                <input
                                  id={`edit-${item._id}-${key}`}
                                  type="file"
                                  accept="image/*"
                                  hidden
                                  onChange={(event) => handleImageChange(event, key, true)}
                                />
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={saveEdit}
                            className="rounded-lg bg-black px-4 py-2 text-xs font-medium text-white"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={resetEditState}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                        <p className="mt-2 text-sm text-gray-500">
                          {item.description.length > 140
                            ? `${item.description.slice(0, 140)}...`
                            : item.description}
                        </p>
                        <p className="mt-3 text-xs text-gray-400">{item.images?.length || 0} image(s)</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteEvent(item._id)}
                            className="rounded-lg border border-red-300 px-4 py-2 text-xs font-medium text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
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
