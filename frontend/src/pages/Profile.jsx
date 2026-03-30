import { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Profile = () => {
  const { backendUrl, token, currency, navigate, userProfile } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const formattedOrders = response.data.orders
          .map((order) => {
            const items = order.items || [];
            return {
              ...order,
              totalAmount: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
              totalItems: items.reduce((sum, item) => sum + item.quantity, 0)
            };
          })
          .sort((left, right) => right.date - left.date);

        setOrders(formattedOrders);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch profile orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const profileStats = useMemo(
    () => ({
      totalOrders: orders.length
    }),
    [orders]
  );

  return (
    <div className="border-t border-[#efe3d7] pb-16 pt-12">
      <div className="flex flex-col gap-10">
        <section className="grid gap-6 rounded-[2rem] border border-[#eadcca] bg-[linear-gradient(135deg,_#fff9f4_0%,_#fffdf9_55%,_#f6e8dc_100%)] p-6 shadow-[0_18px_50px_rgba(108,80,62,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="text-2xl">
              <Title text1="MY" text2="PROFILE" />
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#705749]">
              View your account details, recent orders, payment method info, and delivery activity in one place.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#eadcca] bg-white p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[#b27b5d]">Name</p>
                <p className="mt-3 text-lg font-medium text-[#3f2d24]">
                  {userProfile?.name || 'Loading...'}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[#eadcca] bg-white p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[#b27b5d]">Email</p>
                <p className="mt-3 break-all text-lg font-medium text-[#3f2d24]">
                  {userProfile?.email || 'Loading...'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            <div className="rounded-[1.5rem] border border-[#eadcca] bg-white p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[#b27b5d]">Total Orders</p>
              <p className="mt-3 text-3xl font-['Prata'] text-[#3f2d24]">{profileStats.totalOrders}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-4">
            <div className="text-2xl">
              <Title text1="YOUR" text2="ORDERS" />
            </div>
            <button
              type="button"
              onClick={loadOrderData}
              className="rounded-full border border-[#d6bda7] px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#6b4d3f]"
            >
              Refresh Orders
            </button>
          </div>

          {loading ? (
            <div className="mt-6 rounded-[1.75rem] border border-[#eadcca] bg-white p-8 text-sm text-[#705749]">
              Loading profile data...
            </div>
          ) : orders.length === 0 ? (
            <div className="mt-6 rounded-[1.75rem] border border-dashed border-[#dcc8b3] bg-white p-8 text-sm text-[#705749]">
              You have not placed any orders yet.
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-[1.75rem] border border-[#eadcca] bg-white p-6 shadow-[0_16px_42px_rgba(110,81,59,0.08)]"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#b27b5d]">Order ID</p>
                      <p className="mt-2 text-base font-medium text-[#3f2d24]">{order._id}</p>
                      <p className="mt-2 text-sm text-[#705749]">
                        {new Date(order.date).toLocaleString()}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[430px]">
                      <div className="rounded-2xl bg-[#fff8f1] px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#a7765a]">Status</p>
                        <p className="mt-2 text-sm font-medium text-[#3f2d24]">{order.status}</p>
                      </div>
                      <div className="rounded-2xl bg-[#fff8f1] px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#a7765a]">Payment</p>
                        <p className="mt-2 text-sm font-medium text-[#3f2d24]">{order.paymentMethod}</p>
                      </div>
                      <div className="rounded-2xl bg-[#fff8f1] px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#a7765a]">Total</p>
                        <p className="mt-2 text-sm font-medium text-[#3f2d24]">
                          {currency}
                          {order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {order.items.map((item, index) => (
                      <div
                        key={`${order._id}-${index}`}
                        className="flex gap-4 rounded-[1.25rem] border border-[#f0e4d7] bg-[#fffdf9] p-4"
                      >
                        <img
                          src={item.image?.[0]}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-[#3f2d24]">{item.name}</p>
                          <p className="mt-1 text-sm text-[#705749]">
                            Quantity: {item.quantity} | Price: {currency}
                            {item.price}
                          </p>
                          <p className="mt-1 text-sm text-[#705749]">
                            Category: {item.category} / {item.subCategory}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
