import { Link } from 'react-router-dom';
import Collection from './Collection';

const GiftPackages = () => {
  return (
    <div className="pb-16 pt-8">
      <section className="grid gap-8 rounded-[2.4rem] border border-[#ebddcf] bg-[linear-gradient(135deg,_#fff8f0_0%,_#fffdf9_52%,_#f7e8da_100%)] p-6 shadow-[0_24px_60px_rgba(117,88,66,0.12)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-[#b27b5d]">Floral Arrangements</p>
          <h1 className="mt-4 font-['Prata'] text-4xl leading-tight text-[#3f2d24] sm:text-5xl">
            Gift Items & Packages
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#72584a] sm:text-base">
            Explore curated gift bundles, floral add-ons, and packaged surprises created through the same admin catalog as your bouquet collection.
          </p>

          <div className="mt-8 flex flex-row gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-[#4d3427] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white"
            >
              Customize a Gift Package
            </Link>
            <Link
              to="/services/floral-arrangements/flower-bouquets"
              className="rounded-full border border-[#cdb29d] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6d4d3c]"
            >
              Explore Flower Bouquets
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img src="/s4.jpeg" alt="Gift package" className="h-52 w-full rounded-[1.75rem] object-cover sm:h-72" />
          <img src="/s6.jpeg" alt="Gift bouquet" className="h-52 w-full rounded-[1.75rem] object-cover sm:h-72" />
        </div>
      </section>

      <Collection title1="GIFT ITEMS" title2="& PACKAGES" majorCategory="Gift Items" />
    </div>
  );
};

export default GiftPackages;
