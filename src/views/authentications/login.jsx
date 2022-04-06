import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { loginThunk } from "../../store/auth/auth.actions";

import { InputWithLabel } from "../../components/inputs";
import Container from "./components/container";
import Checkbox from "./components/checkbox";

const inputStyles = {
	wrapper: "flex flex-col",
	label: "text-white font-bold py-2",
	input: "text-white border-b border-b-sky-500 pb-2 transition-colors duration-200 focus:border-b-sky-400",
};

function Login() {
	const dispatch = useDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isRemember, setIsRemember] = useState(false);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		const data = { username, password, saved: isRemember };

		return dispatch(loginThunk(data));
	};

	return (
		<Container title="Login">
			<form
				action="POST"
				className="space-y-6"
				onSubmit={(e) => handleSubmit(e)}>
				<InputWithLabel
					wrapperStyles={inputStyles.wrapper}
					labelStyles={inputStyles.label}
					inputStyles={inputStyles.input}
					label="Username"
					labelFor="username"
					inputName="username"
					isRequired={true}
					value={username}
					onChange={(e) => setUsername(() => e.target.value)}
				/>
				<InputWithLabel
					wrapperStyles={inputStyles.wrapper}
					labelStyles={inputStyles.label}
					inputStyles={inputStyles.input}
					label="Password"
					labelFor="password"
					inputName="password"
					inputType="password"
					isRequired={true}
					value={password}
					onChange={(e) => setPassword(() => e.target.value)}
				/>

				<Checkbox
					name="remember-cta"
					checked={isRemember}
					onChange={() => setIsRemember((state) => !state)}>
					Remember Me
				</Checkbox>

				<div className="grid place-items-center text-center space-y-4">
					<Link
						to="/forgot"
						className="block mt-4 text-white text-sm">
						Forgot password?
					</Link>
					<button
						type="submit"
						className="btn btn-primary rounded w-fit">
						Login
					</button>
					<span className="block text-white text-sm">
						Don't have an account?
						<Link to="/register" className="link ml-1">
							Register
						</Link>
					</span>
				</div>
			</form>
		</Container>
	);
}

export default Login;
