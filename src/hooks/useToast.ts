import { ToastStore } from "../ToastStore";

export const useToast = () => {
	const { removeToast, pushToast, clearToasts } = ToastStore.getState();

	return { removeToast, pushToast, clearToasts };
};
