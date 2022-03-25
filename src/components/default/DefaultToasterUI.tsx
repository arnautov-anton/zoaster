import { useEffect } from "react";
import { css } from "@emotion/css";

export const DefaultToasterUI = ({ customData, dismiss, timeout }) => {
	return (
		<div
			className={css`
				display: flex;
			`}
		></div>
	);
};
