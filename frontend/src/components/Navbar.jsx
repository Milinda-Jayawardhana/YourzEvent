import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const {
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems
  } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const closeMobileMenu = () => {
    setVisible(false);
    setMobileServicesOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-gray-200 bg-white px-4 font-medium sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="relative mx-auto flex h-full w-full items-center justify-between">
        <Link to="/">
          <img src="/logo.jpeg" alt="Logo" className='w-16' />
        </Link>

        <ul className="hidden items-center gap-6 text-sm text-gray-700 sm:flex">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
          </NavLink>

          <div className="group relative">
            <NavLink to="/services" className="flex flex-col items-center gap-1">
              <p>OUR SERVICES</p>
              <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
            </NavLink>

            <div className="invisible absolute left-1/2 top-full z-20 mt-4 w-80 -translate-x-1/2 rounded-[1.5rem] border border-[#eadbca] bg-white p-3 opacity-0 shadow-[0_24px_60px_rgba(101,73,56,0.14)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <NavLink
                to="/services/events"
                className="block rounded-2xl px-4 py-3 text-sm text-[#5f4739] transition-colors hover:bg-[#fcf3ea]"
              >
                Events
              </NavLink>

              <div className="mt-2 rounded-[1.25rem] bg-[#fff8f1] p-3">
                <NavLink
                  to="/services/floral-arrangements/flower-bouquets"
                  className="block text-sm font-medium uppercase tracking-[0.22em] text-[#9c6c52]"
                >
                  Floral Arrangements
                </NavLink>
                <div className="mt-3 flex flex-col gap-2">
                  <NavLink
                    to="/services/floral-arrangements/flower-bouquets"
                    className="rounded-xl px-3 py-2 text-sm text-[#5f4739] transition-colors hover:bg-white"
                  >
                    Flower Bouquets
                  </NavLink>
                  <NavLink
                    to="/services/floral-arrangements/gift-items-packages"
                    className="rounded-xl px-3 py-2 text-sm text-[#5f4739] transition-colors hover:bg-white"
                  >
                    Gift Items & Packages
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img
            onClick={() => navigate('/services/floral-arrangements/flower-bouquets')}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />

          <div className="relative group">
            <img
              onClick={() => (token ? null : navigate('/login'))}
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="Profile"
            />

            {token && (
              <div className="absolute right-0 top-6 z-10 hidden transition-all duration-150 ease-in-out group-hover:block hover:block">
                <div className="flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500 shadow-md">
                  <p className="cursor-pointer hover:text-black" onClick={(e) => e.stopPropagation()}>
                    My Profile
                  </p>
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/orders');
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      logout();
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    Login/Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
            <p className="absolute right-[-5px] bottom-[-5px] aspect-square w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white">
              {getCartCount()}
            </p>
          </Link>

          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu"
          />

          <div
            className={`absolute top-0 right-0 bottom-0 bg-white transition-all duration-300 ease-in-out ${
              visible ? 'w-full' : 'w-0 overflow-hidden'
            }`}
          >
            <div className="flex flex-col bg-white text-gray-600 shadow-lg">
              <div onClick={closeMobileMenu} className="flex cursor-pointer items-center gap-4 p-3">
                <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
                <p>Back</p>
              </div>

              <NavLink onClick={closeMobileMenu} className="border py-2 pl-6" to="/">
                HOME
              </NavLink>
              <NavLink onClick={closeMobileMenu} className="border py-2 pl-6" to="/about">
                ABOUT
              </NavLink>
              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex items-center justify-between border py-2 pl-6 pr-4 text-left"
              >
                <span>OUR SERVICES</span>
                <span>{mobileServicesOpen ? '-' : '+'}</span>
              </button>
              {mobileServicesOpen && (
                <div className="border-x border-b bg-[#fff9f3]">
                  <NavLink onClick={closeMobileMenu} className="block py-2 pl-10" to="/services">
                    All Services
                  </NavLink>
                  <NavLink onClick={closeMobileMenu} className="block py-2 pl-10" to="/services/events">
                    Events
                  </NavLink>
                  <div className="py-2 pl-10 text-xs uppercase tracking-[0.22em] text-[#9c6c52]">
                    Floral Arrangements
                  </div>
                  <NavLink
                    onClick={closeMobileMenu}
                    className="block py-2 pl-14"
                    to="/services/floral-arrangements/flower-bouquets"
                  >
                    Flower Bouquets
                  </NavLink>
                  <NavLink
                    onClick={closeMobileMenu}
                    className="block py-2 pl-14"
                    to="/services/floral-arrangements/gift-items-packages"
                  >
                    Gift Items & Packages
                  </NavLink>
                </div>
              )}
              <NavLink onClick={closeMobileMenu} className="border py-2 pl-6" to="/contact">
                CONTACT
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
