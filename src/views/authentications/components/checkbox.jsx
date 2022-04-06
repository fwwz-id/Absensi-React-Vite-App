import { BiCheck } from "react-icons/bi";

import "./styles.css";

function Checkbox({
	name = "",
	checked = false,

	wrapperStyles = "",
	labelStyles = "",
	checkboxStyles = "",

	children,
	...props
}) {
	return (
		<label className="cursor-pointer">
			{/* checkbox input */}
			<input
				type="checkbox"
				name={name}
				id={name}
				className="appearance-none"
				checked={checked}
				{...props}
			/>
			{/* # checkbox input */}

			{/* custom checkbox */}
			<div className="relative inline-flex items-center space-x-2 py-2">
				<div className="bg-white rounded-sm">
          <BiCheck className={`transition-transform duration-200 ${checked ? "scale-100" : "scale-0"}`}/>
        </div>
        <span className="text-white">{children}</span>
			</div>
			{/* # custom checkbox */}
		</label>
	);
}

export default Checkbox;
