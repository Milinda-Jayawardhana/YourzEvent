import Collection from './Collection';

const FlowerBouquets = () => {
  return (
    <div className="pb-16 pt-8">
      <section className="overflow-hidden rounded-[2.3rem] border border-[#e9dccd] bg-[linear-gradient(135deg,_#fffaf4_0%,_#fff2e8_48%,_#f5e4d5_100%)] px-6 py-10 shadow-[0_20px_60px_rgba(118,86,65,0.1)] sm:px-10">
        <p className="text-sm uppercase tracking-[0.38em] text-[#b17d61]">Floral Arrangements</p>
        <h1 className="mt-4 font-['Prata'] text-4xl leading-tight text-[#3f2d24] sm:text-5xl">
          Flower Bouquets
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6f5648] sm:text-base">
          Browse hand-crafted bouquets for birthdays, anniversaries, elegant gifting, and everyday floral gestures.
        </p>
      </section>

      <Collection title1="FLOWER" title2="BOUQUETS" />
    </div>
  );
};

export default FlowerBouquets;
