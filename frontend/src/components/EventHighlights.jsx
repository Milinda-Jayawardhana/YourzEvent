import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const shuffle = (items) => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const EventHighlights = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventImages = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/event/list`);
        if (response.data.success) {
          const allImages = response.data.events
            .flatMap((event) => event.images || [])
            .filter(Boolean);

          setImages(shuffle(allImages).slice(0, 6));
        }
      } catch (error) {
        console.error('Failed to load event highlights', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventImages();
  }, []);

  if (loading) {
    return (
      <section className="rounded-[2rem] border border-[#eadcca] bg-white p-6 text-sm text-[#705749] sm:p-8">
        Loading event highlights...
      </section>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-[#eadcca] bg-[linear-gradient(180deg,rgba(255,250,244,0.95),rgba(244,231,217,0.9))] p-6 shadow-[0_16px_44px_rgba(110,81,59,0.1)] sm:p-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#b27b5d]">Event Highlights</p>
          <h2 className="mt-2 font-['Prata'] text-3xl text-[#3f2d24]">Fresh moments from our events</h2>
        </div>
        <Link
          to="/services/events"
          className="w-fit rounded-full border border-[#c9ae97] px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#684b3b] transition-colors hover:bg-white"
        >
          View All Events
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt={`Event highlight ${index + 1}`}
            className="h-52 w-full rounded-[1.25rem] object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
};

export default EventHighlights;
