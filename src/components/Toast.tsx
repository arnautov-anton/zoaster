import {
	isValidElement,
	useEffect,
	ComponentType,
	ReactElement,
	useCallback,
	useState,
} from "react";

import { ToastStore, ToastContextProvider } from "../context";

export type ToastProps = {
	/**
	 * UI element to render as `Toast`
	 */
	UIToast: ReactElement | ComponentType;
	/**
	 * Wrapper component which renders your UI component as a child and does not get removed from the tree on `dismiss`, use for stuff like `FramerMotion.AnimationPresence`
	 * @default React.Fragment
	 */
	ToastWrapperComponent: ComponentType;
	/**
	 * Time in miliseconds for which the UI component is going to be visible (in the tree)
	 * @default 5000ms
	 */
	displayDuration: number | null;
	/**
	 * Time in miliseconds for which the Toast component is going to stay in the store after the `dismiss` call
	 * @default 5000ms
	 */
	afterDisplayDuration: number;
	/**
	 * Toast ID generated with the UUIDv4
	 */
	id: string;
	/**
	 * Name of the list to which the `Toast` component is going to be appended/prepended
	 */
	listName: string;
};

export type UIToastProps = {
	dismiss: () => void;
} & Pick<ToastProps, "id" | "listName" | "displayDuration">;

export const Toast = ({
	UIToast,
	displayDuration,
	id,
	listName,
	ToastWrapperComponent,
	afterDisplayDuration,
}: ToastProps) => {
	const [render, setRender] = useState<boolean>(true);

	// removes toast completely from the store array
	const removeToast = useCallback(
		() => ToastStore.getState().removeToast(id, listName),
		[]
	);

	// removes component from the tree (used for AnimationPresence - ToastWrapperComponent)
	const dismiss = useCallback(() => setRender(false), []);

	useEffect(() => {
		if (render) return;

		const t = setTimeout(() => {
			removeToast();
		}, afterDisplayDuration);

		// clear timeout if render was set to false but removeToast from outside was called before this one could
		return () => {
			clearTimeout(t);
		};
	}, [render]);

	useEffect(() => {
		// do not dismiss if displayDuration is set to null
		if (displayDuration === null) return;

		const t = setTimeout(() => {
			dismiss();
		}, displayDuration);

		return () => {
			clearTimeout(t);
		};
	}, []);

	return (
		<ToastContextProvider value={{ displayDuration, id, listName, dismiss }}>
			<ToastWrapperComponent>
				{render && (isValidElement(UIToast) ? UIToast : <UIToast />)}
			</ToastWrapperComponent>
		</ToastContextProvider>
	);
};
