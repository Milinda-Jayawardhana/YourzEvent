import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { buildCategoryTreeFromProducts } from "../utils/categoryHelpers";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "Rs.";
    const delivery_fee = 400;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState("");
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();

    const addToCart = async (itemId, size = "default") => {

        let cartData = structuredClone(cartItems);
        let isFirstTime = false;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
                isFirstTime = true;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
            isFirstTime = true;
        }
        setCartItems(cartData);

        if (isFirstTime) {
            toast.success("Item added to cart", { position: "top-center", autoClose: 2000 });
        }

        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size = "default", quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update",
                    { itemId, size, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
                setCategories((prev) =>
                    prev.length ? prev : buildCategoryTreeFromProducts(response.data.products)
                );
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getCategoriesData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/category/list");
            if (response.data.success) {
                setCategories(response.data.categories);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token: userToken } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserProfile = async (userToken) => {
        try {
            const response = await axios.get(backendUrl + "/api/user/profile", {
                headers: { token: userToken }
            });

            if (response.data.success) {
                setUserProfile(response.data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProductsData();
        getCategoriesData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
            getUserCart(storedToken);
            getUserProfile(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserProfile(token);
        } else {
            setUserProfile(null);
        }
    }, [token]);

    const value = {
        products,
        categories,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        userProfile,
        setUserProfile
    };

    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
