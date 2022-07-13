import { PropsWithChildren } from "react";
import logo from "./logo.svg";
import { css } from "@emotion/css";
import "./App.css";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useTransform,
} from "framer-motion";

import { ToastList, useToast, useToastContext } from "zoaster";

const C = ({
	children,
	title,
	content,
	accent,
}: PropsWithChildren<{
	title: string;
	content: string;
	accent: "info" | "warning" | "error" | "success";
}>) => {
	const { id, dismiss, displayDuration } = useToastContext();

	const x = useMotionValue(0);

	const opacity = useTransform(x, [90, 0, -90], [0, 1, 0]);

	const accentMap = {
		info: {
			color: "#4ec3c7",
			icon: "i",
		},
		warning: {
			color: "#e6bb00",
			icon: "!",
		},
		error: { color: "#c7bb4e", icon: "!" },
		success: { color: "#c7bb4e", icon: "!" },
	};

	const selectedAccent = accentMap[accent];

	return (
		<motion.div
			data-id={id}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			onDragEnd={(e, c) => (c.offset.x > 100 ? dismiss() : null)}
			style={{ x, opacity }}
			className={css`
				display: flex;
				align-items: center;
				background: white;
				border-radius: 5px;
				position: relative;
			`}
		>
			<motion.div
				initial={{ width: "0%" }}
				animate={displayDuration ? { width: "100%" } : {}}
				transition={{ duration: (displayDuration ?? 0) / 1000, type: "tween" }}
				className={css`
					background: rgba(0, 0, 0, 0.1);
					position: absolute;
					height: 100%;
				`}
			/>
			<div
				className={css`
					width: 5px;
					background: ${selectedAccent.color};
					align-self: stretch;
					border-radius: 5px;
				`}
			/>
			<div
				className={css`
					padding: 0px 15px;
					display: flex;
				`}
			>
				<div
					className={css`
						border-radius: 100%;
						height: 50px;
						width: 50px;
						background: ${selectedAccent.color};
						color: var(--z-toast-background);
						display: flex;
						justify-content: center;
						align-items: center;
						font-family: "monospace";
						font-size: 30px;
						font-weight: bold;
					`}
				>
					{selectedAccent.icon}
				</div>
			</div>
			<div
				className={css`
					display: flex;
					flex-direction: column;
					margin: 20px 0px;
				`}
			>
				<h2
					className={css`
						margin: 0px;
						text-align: start;
					`}
				>
					{title}
				</h2>
				<h4
					className={css`
						margin: 0px;
					`}
				>
					{content}
				</h4>
			</div>
			<div
				onClick={dismiss}
				className={css`
					padding: 0px 15px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-family: "monospace";
					font-size: 25px;
					line-height: 1rem;
				`}
			>
				<span
					className={css`
						cursor: pointer;
						transform: rotate(45deg);
					`}
				>
					+
				</span>
			</div>
		</motion.div>
	);
};

const Wrapper = ({ children }: PropsWithChildren<{}>) => {
	return (
		<div
			className={css`
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				flex-direction: column;
				margin: 10px 10px 0px 0px;
				gap: 10px;

				.light & {
					--z-toast-background: #fff;
				}
				.dark & {
					--z-toast-background: #181818;
				}
			`}
		>
			{children}
		</div>
	);
};

function App() {
	const { pushToast } = useToast();

	return (
		<div className="App light">
			<ToastList name="john" WrapperComponent={Wrapper} />
			<ToastList name="john1" />

			<header className="App-header">
				<img
					onClick={() => {
						const id = pushToast({
							listName: "john",
							afterDisplayDuration: 500,
							ToastWrapperComponent: AnimatePresence,
							UIToast: (
								<C
									accent="info"
									title="Did you know?"
									content="Here is something that you might like to know."
								/>
							),
						});
						pushToast({
							displayDuration: 3000,
							UIToast: (
								<C
									accent="warning"
									title="Uh oh, something went wrong"
									content="Sorry! There was aproblem with your request."
								/>
							),
							ToastWrapperComponent: AnimatePresence,
							listName: "john",
						});
					}}
					src={logo}
					alt="logo"
				/>
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
