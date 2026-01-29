import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export { setProducts, setLoading, setError } from "./slices/productsSlice";
export {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "./slices/cartSlice";
export { setUser } from "./slices/userSlice";
