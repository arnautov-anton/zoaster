import {
	isValidElement,
	useEffect,
	ComponentType,
	ReactElement,
	useCallback,
	useMemo,
} from "react";

import { ToastStore, ToastContextProvider } from "../context";

export type ToastProps = {
	UIToast: ReactElement | ComponentType;
	timeout: number | null;
	id: string;
	listName: string;
};

export type UIToastProps = {
	dismiss: () => void;
} & Pick<ToastProps, "id" | "listName" | "timeout">;

export const Toast = ({ UIToast, timeout, id, listName }: ToastProps) => {
	const removeToast = useMemo(() => ToastStore.getState().removeToast, []);

	const dismiss = useCallback(() => removeToast(id, listName), []);

	useEffect(() => {
		if (timeout === null) return;

		const t = setTimeout(() => {
			dismiss();
		}, timeout);

		return () => {
			clearTimeout(t);
		};
	}, []);

	return (
		<ToastContextProvider value={{ timeout, id, listName, dismiss }}>
			{isValidElement(UIToast) ? UIToast : <UIToast />}
		</ToastContextProvider>
	);
};
