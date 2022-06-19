import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import {
	createItem,
	deleteItem,
	deleteList,
	boughtItem,
} from "../redux/shoppingLists";

function List() {
	const navigate = useNavigate();
	const params = useParams();
	const list = useSelector((state) =>
		state.shoppingLists.find((list) => list.id === params.id)
	);
	console.log("--------", list, "-----------");
	const [input, setInput] = useState("");
	const dispatch = useDispatch();
	const newItem = (e) => {
		e.preventDefault();
		dispatch(
			createItem({
				id: nanoid(),
				name: input,
				listId: params.id,
				isBought: false,
			})
		);
		setInput("");
	};
	const delItem = (itemPayload) => {
		dispatch(deleteItem(itemPayload));
	};
	const delList = (listId) => {
		dispatch(deleteList(listId));
		navigate("/");
	};
	return (
		<div className='container w-50 border bg-dark text-white rounded'>
			<div className='list-title-container'>
				<h3 className='list-title'>{list.listTitle}</h3>
				<Button
					onClick={() => {
						delList(list.id);
					}}>
					-
				</Button>
			</div>

			<form onSubmit={newItem}>
				<div class='input-group mb-3 w-50'>
					<input
						type='text'
						class='form-control'
						placeholder='Ingrese un item'
						value={input.charAt(0).toUpperCase() + input.slice(1)}
						onChange={(e) => {
							setInput(e.target.value);
						}}
					/>
					<button
						class='btn btn-outline-secondary'
						type='submit'
						id='button-addon2'>
						+
					</button>
				</div>
			</form>
			<ul className='product-list'>
				{list.items.map((item) => {
					return (
						<li key={item.id}>
							<input
								className='item-input'
								type='checkbox'
								onChange={() => {
									dispatch(boughtItem({ id: item.id, listId: params.id }));
								}}
							/>
							<span className={item.isBought ? "bought" : ""}>{item.name}</span>
							<Button
								className='mx-3'
								type='Button'
								onClick={() => {
									delItem({ id: item.id, listId: params.id });
								}}>
								-
							</Button>
						</li>
					);
				})}
			</ul>
			<Link to='/'>volver</Link>
		</div>
	);
}

export default List;
