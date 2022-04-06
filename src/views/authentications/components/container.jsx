import './styles.css';

export default function Container({ children, title }) {
	return (
		<div className="container-wrapper">
			<div className="form-box">
				<h1 className="text-4xl text-white my-4 text-center">{title}</h1>
				{children}
			</div>
		</div>
	);
}