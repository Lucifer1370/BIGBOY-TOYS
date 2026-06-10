import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    compareList: [],
    wishlist: [],
  },
  reducers: {
    addToCompare: (state, action) => {
      const car = action.payload;
      const exists = state.compareList.some((c) => c._id === car._id);
      if (!exists && state.compareList.length < 3) {
        state.compareList.push(car);
      }
    },
    removeFromCompare: (state, action) => {
      state.compareList = state.compareList.filter((c) => c._id !== action.payload);
    },
    clearCompare: (state) => {
      state.compareList = [];
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    toggleWishlistLocal: (state, action) => {
      const car = action.payload;
      const exists = state.wishlist.some((c) => (c._id || c) === car._id);
      if (exists) {
        state.wishlist = state.wishlist.filter((c) => (c._id || c) !== car._id);
      } else {
        state.wishlist.push(car);
      }
    },
  },
});

export const {
  addToCompare,
  removeFromCompare,
  clearCompare,
  setWishlist,
  toggleWishlistLocal,
} = compareSlice.actions;
export default compareSlice.reducer;
