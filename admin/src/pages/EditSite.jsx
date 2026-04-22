import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";

const EditSite = ({ token }) => {
  const [heroImages, setHeroImages] = useState([]);
  const [showTextSlide, setShowTextSlide] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const previewUrls = useMemo(
    () => selectedFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [selectedFiles]
  );

  const fetchHeroSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/site-settings/hero`);

      if (response.data.success) {
        setHeroImages(response.data.heroImages || []);
        setShowTextSlide(response.data.showTextSlide ?? true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroSettings();
  }, []);

  useEffect(() => {
    return () => {
      previewUrls.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const removeSelectedFile = (targetFile) => {
    setSelectedFiles((prev) =>
      prev.filter(
        (file) => !(file.name === targetFile.name && file.lastModified === targetFile.lastModified)
      )
    );
  };

  const uploadImages = async (event) => {
    event.preventDefault();

    if (!selectedFiles.length) {
      toast.error("Please choose at least one image");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("images", file));

      const response = await axios.post(`${backendUrl}/api/site-settings/hero/images`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setHeroImages(response.data.heroImages || []);
        setShowTextSlide(response.data.showTextSlide ?? true);
        setSelectedFiles([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/site-settings/hero/images/${imageId}`, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setHeroImages(response.data.heroImages || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleTextSlideToggle = async (event) => {
    const nextValue = event.target.checked;
    setShowTextSlide(nextValue);

    try {
      const response = await axios.put(
        `${backendUrl}/api/site-settings/hero/text-slide`,
        { showTextSlide: nextValue },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        setShowTextSlide(!nextValue);
        toast.error(response.data.message);
      }
    } catch (error) {
      setShowTextSlide(!nextValue);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Edit Site</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage the home slider images and choose whether the text slide should be visible.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={showTextSlide}
            onChange={handleTextSlideToggle}
            className="h-4 w-4 rounded border-gray-300"
          />
          Show the text slide in the home slider
        </label>
      </div>

      <form
        onSubmit={uploadImages}
        className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Add Slider Images</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload one or more images. New uploads will appear in the home page slider.
            </p>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white disabled:bg-gray-400"
          >
            {submitting ? "Uploading..." : "Upload Images"}
          </button>
        </div>

        <label
          htmlFor="hero-images"
          className="mt-5 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center"
        >
          <img src={assets.upload_area} alt="" className="h-16 w-16 object-contain opacity-80" />
          <p className="mt-3 text-sm font-medium text-gray-700">Choose slider images</p>
          <p className="mt-1 text-xs text-gray-500">You can select multiple image files at once.</p>
          <input
            id="hero-images"
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </label>

        {previewUrls.length > 0 && (
          <div className="mt-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
              Selected Images
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {previewUrls.map(({ file, url }) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="relative overflow-hidden rounded-xl border border-gray-200"
                >
                  <img src={url} alt={file.name} className="h-36 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(file)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/75 text-sm font-semibold text-white transition hover:bg-black"
                    aria-label={`Remove ${file.name}`}
                  >
                    ×
                  </button>
                  <div className="p-3 text-xs text-gray-500">{file.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Current Slider Images</h3>
            <p className="mt-1 text-sm text-gray-500">
              Delete any image here and it will be removed from the home slider.
            </p>
          </div>
          <p className="text-sm text-gray-400">{heroImages.length} image(s)</p>
        </div>

        {loading ? (
          <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-500">
            Loading site settings...
          </div>
        ) : heroImages.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-500">
            No slider images added yet.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {heroImages.map((item) => (
              <div key={item._id} className="overflow-hidden rounded-xl border border-gray-200">
                <img src={item.image} alt="Hero slide" className="h-52 w-full object-cover" />
                <div className="flex items-center justify-between p-4">
                  <p className="text-sm text-gray-500">Slider image</p>
                  <button
                    type="button"
                    onClick={() => deleteImage(item._id)}
                    className="rounded-lg border border-red-300 px-4 py-2 text-xs font-medium text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

EditSite.propTypes = {
  token: PropTypes.string.isRequired,
};

export default EditSite;
