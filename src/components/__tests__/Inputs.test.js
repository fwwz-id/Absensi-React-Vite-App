import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputWithLabel } from "../inputs";

describe("Inputs check", () => {

	it("Should render correctly w/ label and empty string as initial value", () => {
		let value = "";
		const onChange = jest.fn().mockImplementation((state) => state);

		render(
			<InputWithLabel label="User" labelFor="user" inputName="user" value={value} onInputChange={onChange}/>
		);

		expect(screen.getByRole("textbox").value).toBe(value);
		
		const newValue = "Briyan Fajar Syahputra"
		userEvent.type(screen.getByRole('textbox'), newValue);
		
		expect(screen.getByRole('textbox').value).toBe(newValue)
	});
});
