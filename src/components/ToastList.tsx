import {
	useCallback,
	useEffect,
	PropsWithChildren,
	ComponentType,
	Fragment,
} from "react";

import { ToastStore as useStore } from "../ToastStore";

export type ToastListProps = {
	name: string;
	WrapperComponent?: ComponentType<PropsWithChildren<Record<string, unknown>>>;
};

export const ToastList = ({
	name,
	WrapperComponent = Fragment,
}: ToastListProps) => {
	const [list = [], createList, removeList] = useStore(
		useCallback(
			(state) => [state.toasts[name], state.createList, state.removeList],
			[name]
		)
	);

	useEffect(() => {
		createList(name);
		return () => removeList(name);
	}, [name]);

	return <WrapperComponent>{list.map((v) => v.toast)}</WrapperComponent>;
};
