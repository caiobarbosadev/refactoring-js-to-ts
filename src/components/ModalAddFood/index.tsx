import {createRef} from 'react';
import {FiCheckSquare} from 'react-icons/fi';

import {Form} from './styles';
import {Modal} from '../Modal';
import Input from '../Input';
import {type FoodsProps} from '../../pages/Dashboard';
import {type FormHandles} from '@unform/core';

type AddProps = {
	setIsOpen: () => void;
	handleAddFood: (data: FoodsProps) => void;
	isOpen: boolean;
};

export function ModalAddFood({handleAddFood, isOpen, setIsOpen}: AddProps) {
	const formRef = createRef<FormHandles>();

	const handleSubmit = async (data: FoodsProps) => {
		handleAddFood(data);
		setIsOpen();
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<h1>Novo Prato</h1>
				<Input name='image' placeholder='Cole o link aqui' />

				<Input name='name' placeholder='Ex: Moda Italiana' />
				<Input name='price' placeholder='Ex: 19.90' />

				<Input name='description' placeholder='Descrição' />
				<button type='submit' data-testid='add-food-button'>
					<p className='text'>Adicionar Prato</p>
					<div className='icon'>
						<FiCheckSquare size={24} />
					</div>
				</button>
			</Form>
		</Modal>
	);
}
