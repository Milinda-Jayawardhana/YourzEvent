import { Link } from 'react-router-dom';

const packageIdeas = [
  {
    title: 'Sweet Surprise Box',
    detail: 'Mini bouquet, artisan chocolates, and a handwritten message card.'
  },
  {
    title: 'Celebration Bundle',
    detail: 'Signature flowers paired with cake, candles, and soft keepsake accents.'
  },
  {
    title: 'Luxury Gift Crate',
    detail: 'Premium blooms, curated self-care items, and elegant ribbon-wrapped presentation.'
  }
];

const GiftPackages = () => {
  return (
    <div className="pb-16 pt-8">
      <section className="grid gap-8 rounded-[2.4rem] border border-[#ebddcf] bg-[linear-gradient(135deg,_#fff8f0_0%,_#fffdf9_52%,_#f7e8da_100%)] p-6 shadow-[0_24px_60px_rgba(117,88,66,0.12)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-[#b27b5d]">Gift Items & Packages</p>
          <h1 className="mt-4 font-['Prata'] text-4xl leading-tight text-[#3f2d24] sm:text-5xl">
            Pair blooms with thoughtful extras for ready-to-gift experiences.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#72584a] sm:text-base">
            This page mirrors the floral category style, but focuses on packaged gifting ideas like chocolates, keepsakes, celebration sets, and curated surprise boxes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-[#4d3427] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white"
            >
              Customize a Gift Package
            </Link>
            <Link
              to="/services/floral-arrangements/flower-bouquets"
              className="rounded-full border border-[#cdb29d] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#6d4d3c]"
            >
              View Flower Bouquets
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img src="/s4.jpeg" alt="Gift package" className="h-44 w-full rounded-[1.5rem] object-cover sm:h-56" />
          <img src="/s6.jpeg" alt="Gift bouquet" className="h-44 w-full rounded-[1.5rem] object-cover sm:h-56" />
          <img src="/s8.jpeg" alt="Gift set" className="col-span-2 h-52 w-full rounded-[1.75rem] object-cover sm:h-72" />
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {packageIdeas.map((item) => (
          <div key={item.title} className="rounded-[1.75rem] border border-[#eddcca] bg-white p-6">
            <h2 className="font-['Prata'] text-2xl text-[#422f25]">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#6f5648]">{item.detail}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default GiftPackages;
