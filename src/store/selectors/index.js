export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export const selectUser = (state) => state.user.data;