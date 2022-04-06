export function InputWithLabel({
	wrapperStyles = "",

	label = "",
	labelFor = "",
	labelStyles = "",

	inputName = "",
	inputStyles = "",
	inputType = "",
	placeholder,

	isRequired = false,
	children,

	...props
}) {
	return (
		<label htmlFor={labelFor} className={wrapperStyles}>
			<span className={labelStyles}>
				{label}
			</span>
			<input
				type={inputType}
				placeholder={placeholder}
				name={inputName}
				className={`default-input ${inputStyles}`}
				required={isRequired}
				{...props}
			/>
			{children}
		</label>
	);
}
