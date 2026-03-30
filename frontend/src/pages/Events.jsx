import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const heroImages = ['/e2.jpeg', '/e3.jpeg', '/e4.jpeg'];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/event/list`);
        if (response.data.success) {
          setEvents(response.data.events);
        }
      } catch (error) {
        console.error('Failed to load events', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const selectedEvent = useMemo(
    () => events.find((item) => item._id === selectedEventId) || null,
    [events, selectedEventId]
  );

  return (
    <div className="pb-16 pt-8">
      <section className="grid gap-6 overflow-hidden rounded-[2.3rem] border border-[#eadfce] bg-[#fffaf4] p-6 shadow-[0_22px_60px_rgba(112,84,62,0.12)] lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[#af7d60]">Events</p>
          <h1 className="mt-4 font-['Prata'] text-4xl leading-tight text-[#402f26] sm:text-5xl">
            Floral styling for celebrations that deserve a full atmosphere.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#71584b] sm:text-base">
            Browse event concepts added from the admin panel, then open any card to explore the
            full styling idea in a focused popup gallery.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-[#4d3427] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white"
            >
              Book an Event Consultation
            </Link>
            <Link
              to="/services"
              className="rounded-full border border-[#c9ae97] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#684b3b]"
            >
              Back to Services
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Event inspiration ${index + 1}`}
              className={`w-full rounded-[1.5rem] object-cover ${index === 2 ? 'col-span-2 h-52 sm:h-72' : 'h-44 sm:h-56'}`}
            />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5">
          <p className="text-sm uppercase tracking-[0.35em] text-[#af7d60]">Event Concepts</p>
          <h2 className="mt-2 font-['Prata'] text-3xl text-[#3f2d24]">Choose a style to explore</h2>
        </div>

        {loading ? (
          <div className="rounded-[1.75rem] border border-[#eadcca] bg-white p-8 text-sm text-[#705749]">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-[#dcc8b3] bg-white p-8 text-sm text-[#705749]">
            No events have been added yet.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((item) => (
              <button
                key={item._id}
                type="button"
                onClick={() => setSelectedEventId(item._id)}
                className="overflow-hidden rounded-[1.75rem] border border-[#eadcca] bg-white text-left shadow-[0_16px_40px_rgba(110,81,59,0.08)] transition hover:-translate-y-1"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-['Prata'] text-2xl text-[#3f2d24]">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(35,25,18,0.32)] px-4 py-8 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-[#eadcca] bg-white p-6 shadow-[0_28px_80px_rgba(67,47,34,0.22)] lg:p-8">
            <button
              type="button"
              onClick={() => setSelectedEventId('')}
              className="absolute right-5 top-5 rounded-full border border-[#d6bda7] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#6b4d3f]"
            >
              Close
            </button>

            <div className="flex flex-col gap-4 pr-20 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-[#b27b5d]">Selected Event</p>
                <h3 className="mt-3 font-['Prata'] text-3xl text-[#3f2d24]">{selectedEvent.title}</h3>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#705749]">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="rounded-full bg-[#4d3427] px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white"
                >
                  Book Event
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedEventId('')}
                  className="rounded-full border border-[#d6bda7] px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#6b4d3f]"
                >
                  Go Back
                </button>
              </div>
            </div>

            <div className={`mt-8 grid gap-4 ${selectedEvent.images.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}>
              {selectedEvent.images.map((image, index) => (
                <img
                  key={`${selectedEvent._id}-${index}`}
                  src={image}
                  alt={`${selectedEvent.title} ${index + 1}`}
                  className="h-64 w-full rounded-[1.5rem] object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
