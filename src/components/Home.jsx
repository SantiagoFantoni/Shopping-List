import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createList } from "../redux/shoppingLists";
import { Link, useNavigate } from "react-router-dom";

import { Form, Stack, Modal, Button } from "react-bootstrap";

function Home() {
	const date = new Date();
	let today = `${date.getDate()}/ ${
		date.getMonth() + 1
	}/ ${date.getFullYear()}`;
	console.log(today);
	const shoppingLists = useSelector((state) => state.shoppingLists);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [listTitle, setListTitle] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<div className='container-sm'>
			<ul className='main-list'>
				{shoppingLists.map((list) => {
					return (
						<div key={list.id}>
							<li
								onClick={() => {
									navigate(`../lista/${list.id}`);
								}}>
								<h5>{list.listTitle}</h5>
								<div>({list.items.length})</div>
								<span>{list.date}</span>
							</li>
						</div>
					);
				})}
			</ul>
			<Button className='rounded-circle' onClick={handleShow}>
				+
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Crear Lista</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							dispatch(createList(listTitle, today));
							setListTitle("");
							handleClose();
						}}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Nombre de la lista</Form.Label>
							<Form.Control
								type='text'
								placeholder='ej:Fruteria...'
								autoFocus
								value={listTitle.charAt(0).toUpperCase() + listTitle.slice(1)}
								onChange={(event) => {
									setListTitle(event.target.value);
								}}
							/>
							<Stack
								className='d-flex justify-content-center my-3'
								direction='horizontal'
								gap={2}>
								<Button variant='secondary' onClick={handleClose}>
									Cerrar
								</Button>
								<Button type='submit' variant='success' onClick={handleClose}>
									Crear
								</Button>
							</Stack>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default Home;
