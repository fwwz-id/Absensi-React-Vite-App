import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { registerThunk } from "../../store/auth/auth.actions";

import Container from "./components/container";
import { InputWithLabel } from "../../components/inputs";
import { Dialog, Listbox, Transition } from "@headlessui/react";

import { BiX } from "react-icons/bi";

const inputStyles = {
	normal: "border-b border-b-sky-500 pb-2 transition-colors duration-200 focus:border-b-sky-400",
	error: "border-b border-b-fuchsia-500 pb-2 transition-colors duration-200 focus:border-b-fuchsia-400",
};

const inputMessages = {
	username: {
		normal: "username must above 3 characters and not contains number and symbol.",
		error: "invalid username.",
	},
	password: {
		normal: "password length must above 5 characters",
		error: "invalid password",
	},
	confirmPass: {
		normal: "password must match.",
		error: "invalid password",
	},
};

const regex = /^[a-z]{2,}(?:[ ]|[a-z])+/gi;

function TextHelper({ children, ...props }) {
	return <small {...props}>{children}</small>;
}

function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// state for handling input value
	const [formValue, setFormValue] = useState({
		username: "",
		password: "",
		confpassword: "",
		role: "Select your role",
	});
	// state for handling input style
	const [isInputInvalid, setIsInputInvalid] = useState({
		username: true,
		password: true,
		confpassword: true,
		role: true,
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		const { username, password, confpassword, role } = formValue;

		const isUserValid = !!username.match(regex);
		const isPassValid = password.length > 5;
		const isConfPassEqual = confpassword === password;
		const isRoleValid = role.toLowerCase() !== "select your role";

		if (isUserValid && isPassValid && isConfPassEqual && isRoleValid) {
			const data = {
				username: username.trim(),
				password,
				role,
			};

			dispatch(registerThunk(data))
			.then(res => {
				if (res.meta.requestStatus === "fulfilled") {
					setIsDialogOpen(() => true);

					setFormValue((state) => ({
						...state,
						username: '',
						password: '',
						confpassword: '',
						role: 'Select your role'
					}))
				}
			}).catch(err => {
				console.log(err)
			})
		}

		if (!isUserValid) {
			setIsInputInvalid((state) => ({
				...state,
				username: false,
			}));
		}
		if (!isPassValid) {
			setIsInputInvalid((state) => ({
				...state,
				password: false,
			}));
		}
		if (!isConfPassEqual) {
			setIsInputInvalid((state) => ({
				...state,
				confpassword: false,
			}));
		}
		if (!isRoleValid) {
			setIsInputInvalid((state) => ({
				...state,
				role: false,
			}));
		}
	};

	const onInputChange = (e) => {
		const { name, value } = e.target;

		setFormValue((state) => ({
			...state,
			[name]: value,
		}));
	};

	const selectChange = (value) => {
		const role = value === "Koordinator" ? "moderator" : "mentor";

		setFormValue((state) => ({
			...state,
			role,
		}));
	};

	return (
		<Container title="Register">
			<form
				action="POST"
				className="space-y-6 flex flex-col"
				onSubmit={(e) => handleSubmit(e)}>
				<InputWithLabel
					wrapperStyles="grid"
					label="Username"
					labelFor="username"
					labelStyles="font-bold text-white"
					inputName="username"
					inputStyles={
						!isInputInvalid.username
							? inputStyles.error
							: inputStyles.normal
					}
					isRequired={true}
					value={formValue.username}
					onChange={(e) => onInputChange(e)}>
					<TextHelper
						className={
							!isInputInvalid.username
								? "text-fuchsia-500"
								: "text-zinc-400"
						}>
						{!isInputInvalid.username
							? inputMessages.username.error
							: inputMessages.username.normal}
					</TextHelper>
				</InputWithLabel>
				<InputWithLabel
					wrapperStyles="grid"
					label="Password"
					labelFor="password"
					labelStyles="font-bold text-white"
					inputName="password"
					inputType="password"
					inputStyles={
						!isInputInvalid.password
							? inputStyles.error
							: inputStyles.normal
					}
					isRequired={true}
					value={formValue.password}
					onChange={(e) => onInputChange(e)}>
					<TextHelper
						className={
							!isInputInvalid.password
								? "text-fuchsia-500"
								: "text-zinc-400"
						}>
						{!isInputInvalid.password
							? inputMessages.password.error
							: inputMessages.password.normal}
					</TextHelper>
				</InputWithLabel>
				<InputWithLabel
					wrapperStyles="grid"
					label="Confirm Password"
					labelFor="confpassword"
					labelStyles="font-bold text-white"
					inputName="confpassword"
					inputType="password"
					inputStyles="border-b border-b-sky-500 pb-2 transition-colors duration-200 focus:border-b-sky-400"
					isRequired={true}
					value={formValue.confpassword}
					onChange={(e) => onInputChange(e)}>
					<TextHelper
						className={
							!isInputInvalid.confpassword
								? "text-fuchsia-500"
								: "text-zinc-400"
						}>
						{!isInputInvalid.confpassword
							? inputMessages.confirmPass.error
							: inputMessages.confirmPass.normal}
					</TextHelper>
				</InputWithLabel>

				<Listbox
					value={formValue.role}
					onChange={selectChange}
					as="div"
					className="space-y-2 relative">
					<Listbox.Label
						as="p"
						className="block text-white font-bold">
						Role
					</Listbox.Label>
					<Listbox.Button className="btn rounded-sm text-sm bg-white">
						{formValue.role}
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition-transform duration-200 origin-top-left"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-0 opacity-0">
						<Listbox.Options className="bg-white rounded absolute">
							{
								//
								["Koordinator", "Pengampu"].map((value, id) => (
									<Listbox.Option
										key={id}
										value={value}
										as={Fragment}>
										{({ active, selected }) => (
											<li
												className={`p-2 cursor-pointer duration-100 transition-colors text-sm ${
													selected || active
														? "bg-sky-500 text-white"
														: ""
												}`}>
												{value}
											</li>
										)}
									</Listbox.Option>
								))
							}
						</Listbox.Options>
					</Transition>
					{!isInputInvalid.role && (
						<TextHelper className="block text-fuchsia-500 pt-2">
							You must select valid role
						</TextHelper>
					)}
				</Listbox>

				<div className="flex justify-end space-x-2">
					<Link
						to="/login"
						className="btn border border-sky-500 text-white transition-colors duration-200 hover:border-sky-600 rounded">
						Back
					</Link>
					<button type="submit" className="btn btn-primary rounded">
						Register
					</button>
				</div>
			</form>

			<Dialog
				className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm flex items-center justify-center"
				open={isDialogOpen}
				onClose={() => setIsDialogOpen(() => false)}>
				<Dialog.Overlay className="fixed inset-0 bg-zinc-800 bg-opacity-50" />

				<div className="relative z-10 p-4 bg-white rounded">
					<span className="btn-primary p-2 absolute -right-2 -top-4 rounded-full" onClick={() => navigate('/login')}>
						<BiX />
					</span>
					<Dialog.Description className="font-bold">
						Successfully create an account.
					</Dialog.Description>
				</div>
			</Dialog>
		</Container>
	);
}

export default Register;
