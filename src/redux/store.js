import { configureStore } from "@reduxjs/toolkit";
import shoppingListsSlice from "./shoppingLists";

const store = configureStore({
	reducer: { shoppingLists: shoppingListsSlice },
});

export default store;
