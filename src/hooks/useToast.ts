import { useMemo } from "react";
import { ToastStore, ToastStoreType } from "../context";

export const useToast = () => {
	const { removeToast, pushToast, clearToasts } = useMemo(
		() => ToastStore.getState(),
		[]
	);

	return { removeToast, pushToast, clearToasts } as Pick<
		ToastStoreType,
		"removeToast" | "pushToast" | "clearToasts"
	>;
};
