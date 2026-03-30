import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const serviceCards = [
  {
    title: 'Floral Arrangements',
    description:
      'Discover our bespoke floral creations, including luxury bouquets, bridal florals, elegant centerpieces, and decorative installations. From intimate gifts to large-scale event styling, each arrangement is thoughtfully designed using premium blooms and refined artistry to deliver beauty, elegance, and a memorable experience.', links: [
        { label: 'Flower Bouquets', to: '/services/floral-arrangements/flower-bouquets' },
        { label: 'Gift Items & Packages', to: '/services/floral-arrangements/gift-items-packages' }
      ],
    images: ['/s1.jpeg', '/g1.jpeg', '/g2.jpeg', '/s4.jpeg']
  },
  {
    title: 'Events',
    description:
      'We create bespoke event décor and styling for weddings, engagements, private celebrations, and corporate occasions. From sophisticated floral arrangements and stunning stage designs to themed concepts and brand launches, every element is carefully curated to reflect your vision. Whether it’s an intimate gathering or a large-scale event, we deliver elegant, memorable experiences with exceptional attention to detail.', links: [
        { label: 'Explore Events', to: '/services/events' }
      ],
    images: ['/e1.jpeg', '/e2.jpeg', '/e3.jpeg', '/e4.jpeg']
  }
];

const SlidingServiceCard = ({ card, isActive, onHover }) => {
  const isFloralCard = card.title === 'Floral Arrangements';

  return (
    <div
      onMouseEnter={onHover}
      className="group relative overflow-hidden rounded-[2rem] border border-[#e8ddcf] bg-[#fffaf4] px-6 py-8 shadow-[0_20px_60px_rgba(138,94,76,0.12)] transition-transform duration-300 hover:-translate-y-1 sm:px-8 sm:py-10 lg:px-10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff8f1] via-transparent to-[#f7ecdf]" />
      <div className="relative z-10 flex min-h-[420px] h-full flex-col gap-8 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-col justify-center py-2 lg:py-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#b48363]">Our Services</p>
          <h2 className="mt-3 font-['Prata'] text-3xl text-[#3f2d24]">{card.title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#72594a] text-justify lg:min-h-[112px]">
            {card.description}
          </p>

          {isFloralCard ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {card.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-full border border-[#6f4c3a] bg-[#6f4c3a] px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-white transition-colors hover:border-[#543629] hover:bg-[#543629]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap gap-3">
              {card.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-full border border-[#6f4c3a] bg-[#6f4c3a] px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-white transition-colors hover:border-[#543629] hover:bg-[#543629]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3 lg:self-center">
          {card.images.map((image, index) => (
            <div
              key={image}
              className={`overflow-hidden rounded-[1.35rem] border border-white/70 shadow-lg transition-all duration-500 ${isActive && index === 0 ? 'scale-[1.03]' : ''
                }`}
            >
              <img
                src={image}
                alt={card.title}
                className="h-36 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-44"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % serviceCards.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-16 pt-8">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[#efe3d5] bg-[radial-gradient(circle_at_top_left,_rgba(255,250,244,1),_rgba(247,235,220,1)_55%,_rgba(242,223,206,1)_100%)] px-6 py-12 sm:px-10 lg:px-14">
        <div className="pointer-events-none absolute right-[-4rem] top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(177,124,95,0.18)_0%,_rgba(177,124,95,0.07)_46%,_transparent_72%)] lg:block" />
        <div className="pointer-events-none absolute right-20 top-16 hidden h-24 w-24 rotate-12 rounded-[2rem] border border-white/70 bg-white/35 shadow-[0_12px_30px_rgba(141,101,79,0.08)] backdrop-blur-sm lg:block" />
        <div className="pointer-events-none absolute bottom-10 right-32 hidden h-14 w-14 rounded-full border border-[#d8b79e] bg-[#f3dfcf]/90 shadow-[0_10px_24px_rgba(141,101,79,0.08)] lg:block" />
        <p className="text-sm uppercase tracking-[0.4em] text-[#ad7a5f]">Our Services</p>
        <div className="relative z-10 mt-5 max-w-3xl lg:max-w-[60rem] lg:pr-40">
          <h1 className="font-['Prata'] text-4xl leading-tight text-[#3f2d24] sm:text-5xl">
            Floral stories crafted for gifting moments and unforgettable events.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#6f5648] sm:text-base">
            Instead of a plain services list, this page opens with two immersive service blocks so visitors can immediately choose between floral gifting and event styling.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-6">
        {serviceCards.map((card, index) => (
          <SlidingServiceCard
            key={card.title}
            card={card}
            isActive={activeIndex === index}
            onHover={() => setActiveIndex(index)}
          />
        ))}
      </section>
    </div>
  );
};

export default Services;

SlidingServiceCard.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
      })
    ).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired
};
