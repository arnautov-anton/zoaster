import { createContext, PropsWithChildren } from "react";

import { UIToastProps } from "../components";

export const ToastContext = createContext<UIToastProps | undefined>(undefined);

export const ToastContextProvider = (
	props: PropsWithChildren<{ value: UIToastProps }>
) => <ToastContext.Provider {...props} />;
