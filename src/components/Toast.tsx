import {
	isValidElement,
	useEffect,
	ComponentType,
	ReactElement,
	useCallback,
	createContext,
	PropsWithChildren,
} from "react";

import { ToastStore } from "../ToastStore";

const ToastContext = createContext<UIToastProps | undefined>(undefined);

const ToastContextProvider = (
	props: PropsWithChildren<{ value: UIToastProps }>
) => <ToastContext.Provider {...props} />;

export type ToastProps = {
	UIToast: ReactElement | ComponentType;
	timeout: number | null;
	id: string;
	listName: string;
};

export type UIToastProps = {
	dismiss: () => void;
} & Omit<ToastProps, "UIToast">;

export const Toast = ({ UIToast, timeout, id, listName }: ToastProps) => {
	const removeToast = ToastStore.getState().removeToast;

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
