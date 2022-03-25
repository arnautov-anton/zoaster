import {
	isValidElement,
	useEffect,
	ElementType,
	ComponentType,
	ReactNode,
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
	UIElement: ReactNode;
	timeout: number | null;
	id: string;
	listName: string;
};

export type UIToastProps = {
	dismiss: () => void;
} & Pick<ToastProps, "id" | "listName" | "timeout">;

export const Toast = ({ UIElement, timeout, id, listName }: ToastProps) => {
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
			{UIElement}
		</ToastContextProvider>
	);

	// return (
	// 	<UIComponentOrElement
	// 		dismiss={dismiss}
	// 		id={id}
	// 		listName={listName}
	// 		timeout={timeout}
	// 	/>
	// );
};
