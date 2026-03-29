import { Link } from 'react-router-dom';
import Collection from './Collection';

const FlowerBouquets = () => {
  return (
    <div className="pb-16 pt-8">
      <section className="grid gap-8 rounded-[2.4rem] border border-[#ebddcf] bg-[linear-gradient(135deg,_#fff8f0_0%,_#fffdf9_52%,_#f7e8da_100%)] p-6 shadow-[0_24px_60px_rgba(117,88,66,0.12)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-[#b27b5d]">Floral Arrangements</p>
          <h1 className="mt-4 font-['Prata'] text-4xl leading-tight text-[#3f2d24] sm:text-5xl">
            Flower Bouquets
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#72584a] sm:text-base">
            Browse hand-crafted bouquets for birthdays, anniversaries, elegant gifting, and everyday floral gestures created through the same admin catalog as your gift collection.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-[#4d3427] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white"
            >
              Customize a Bouquet
            </Link>
            <Link
              to="/services/floral-arrangements/gift-items-packages"
              className="rounded-full border border-[#cdb29d] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#6d4d3c]"
            >
              Explore Gift Items
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img src="/s1.jpeg" alt="Flower bouquet" className="h-52 w-full rounded-[1.75rem] object-cover sm:h-72" />
          <img src="/s3.jpeg" alt="Fresh flowers" className="h-52 w-full rounded-[1.75rem] object-cover sm:h-72" />
        </div>
      </section>

      <Collection title1="FLOWER" title2="BOUQUETS" majorCategory="Flower Bouquets" />
    </div>
  );
};

export default FlowerBouquets;
