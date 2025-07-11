import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import commonFeatureImageSlice from "./common/image-upload-slice";
import adminProductSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/orders-slice";
import shoppingProductsSlice from "./shop/products-slice";
import shoppingCartSlice from "./shop/cart-slice";
import shoppingAddressSlice from "./shop/address-slice";
import shoppingOrderSlice from "./shop/order-slice";
import shoppingSearchSlice from "./shop/search-slice";
import shoppingReviewSlice from "./shop/review-slice";
import adminSearchSlice from "./admin/search-slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    adminOrders: adminOrderSlice,
    adminSearch : adminSearchSlice,
    shoppingProducts: shoppingProductsSlice,
    shoppingCart: shoppingCartSlice,
    shoppingAddress: shoppingAddressSlice,
    shoppingOrders: shoppingOrderSlice,
    shoppingSearch: shoppingSearchSlice,
    shoppingReview: shoppingReviewSlice,
    commonFeatureImage: commonFeatureImageSlice,
  },
});

export default store;
