import { useContext } from "react";
import { ToastContext } from "../context";
import { UIToastProps } from "../components";

export const useToastContext = () => useContext(ToastContext) as UIToastProps;
