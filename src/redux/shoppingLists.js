import { createSlice, nanoid } from "@reduxjs/toolkit";

const shoppingListsSlice = createSlice({
	name: "shoppingLists",
	initialState: [],
	reducers: {
		createList: {
			reducer: (state, action) => {
				state.push(action.payload);
			},
			prepare: (listTitle, date) => {
				const id = nanoid();
				return { payload: { id, listTitle, items: [], date } };
			},
		},

		deleteList(state, action) {
			return state.filter((list) => list.id !== action.payload);
		},
		createItem(state, action) {
			state.map((list) => {
				if (list.id === action.payload.listId) {
					list.items.push({
						id: action.payload.id,
						name: action.payload.name,
						isBought: action.payload.isBought,
					});
				} else {
					return list;
				}
			});
		},

		deleteItem(state, action) {
			const list = state.find((list) => list.id === action.payload.listId);
			list.items = list.items.filter((item) => item.id !== action.payload.id);
		},
		boughtItem(state, action) {
			const item = state
				.find((list) => list.id === action.payload.listId)
				.items.find((item) => item.id === action.payload.id);
			item.isBought = !item.isBought;
		},
	},
});
export const { createList, deleteList, createItem, deleteItem, boughtItem } =
	shoppingListsSlice.actions;
export default shoppingListsSlice.reducer;
