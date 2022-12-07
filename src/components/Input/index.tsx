import {
	useEffect,
	useRef,
	useState,
	useCallback,
	type InputHTMLAttributes,
} from 'react';

import {useField} from '@unform/core';
import {Container} from './styles';
import {type IconBaseProps} from 'react-icons';

type InputProps = {
	name: string;
	icon?: React.ComponentType<IconBaseProps>;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({name, icon: Icon, ...rest}: InputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState<boolean>(false);

	const {fieldName, defaultValue, registerField} = useField(name);

	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleInputBlur = useCallback(() => {
		setIsFocused(false);

		setIsFilled(Boolean(inputRef.current?.value));
	}, []);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	return (
		<Container isFilled={isFilled} isFocused={isFocused}>
			{Icon && <Icon size={20} />}

			<input
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				defaultValue={defaultValue}
				ref={inputRef}
				{...rest}
			/>
		</Container>
	);
};

export default Input;
