import { Link } from 'react-router-dom';

const eventHighlights = [
  {
    title: 'Weddings & Proposals',
    description: 'Romantic arches, bridal bouquets, aisle florals, and intimate proposal setups.'
  },
  {
    title: 'Birthdays & Private Parties',
    description: 'Statement flowers, table styling, welcome corners, and themed photo moments.'
  },
  {
    title: 'Corporate & Brand Events',
    description: 'Launch decor, lobby florals, gifting stations, and branded event styling.'
  }
];

const Events = () => {
  return (
    <div className="pb-16 pt-8">
      <section className="grid gap-6 overflow-hidden rounded-[2.3rem] border border-[#eadfce] bg-[#fffaf4] p-6 shadow-[0_22px_60px_rgba(112,84,62,0.12)] lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[#af7d60]">Events</p>
          <h1 className="mt-4 font-['Prata'] text-4xl leading-tight text-[#402f26] sm:text-5xl">
            Floral styling for celebrations that deserve a full atmosphere.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#71584b] sm:text-base">
            This is a frontend sample page for your events service. It shows how we can present event styling as a premium offering even before you add full booking functionality.
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
          <img src="/s9.jpeg" alt="Event flowers" className="h-44 w-full rounded-[1.5rem] object-cover sm:h-56" />
          <img src="/s10.jpeg" alt="Event setup" className="h-44 w-full rounded-[1.5rem] object-cover sm:h-56" />
          <img src="/s11.jpeg" alt="Celebration styling" className="col-span-2 h-52 w-full rounded-[1.75rem] object-cover sm:h-72" />
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {eventHighlights.map((item) => (
          <div key={item.title} className="rounded-[1.75rem] border border-[#eadcca] bg-white p-6">
            <h2 className="font-['Prata'] text-2xl text-[#3f2d24]">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#705749]">{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Events;
