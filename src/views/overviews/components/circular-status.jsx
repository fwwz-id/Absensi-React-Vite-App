import React from "react";

function CircularStatus({ status }) {
	return (
		<div
			className={`circular ${
				status === "hadir"
					? "status-attend"
					: status === "sakit"
					? "status-sick"
					: status === "izin"
					? "status-permit"
					: status === "alpha"
					? "status-absent"
					: "status-idle"
			}`}
		/>
	);
}

export default CircularStatus;
