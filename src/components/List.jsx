import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	createItem,
	deleteItem,
	deleteList,
	boughtItem,
} from "../redux/shoppingLists";
import { Link, useParams, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";

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
		<div className='container-sm'>
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
				<input
					type='text'
					value={input}
					name='item'
					onChange={(e) => {
						setInput(e.target.value);
					}}
				/>
				<Button type='submit'>+</Button>
			</form>
			<ul className='product-list'>
				{list.items.map((item) => {
					return (
						<li key={item.id}>
							<input
								type='checkbox'
								onChange={() => {
									dispatch(boughtItem({ id: item.id, listId: params.id }));
								}}
							/>
							<span className={item.isBought ? "bought" : ""}>{item.name}</span>
							<Button
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
