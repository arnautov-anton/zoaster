import { v4 as uuid } from "uuid";
import { ReactElement } from "react";
import create from "zustand";
import { produce } from "immer";

import { ToastProps, Toast } from "./components";

type UUID = string;

export type ToastStoreType = {
	toasts: Record<string, Array<{ id: UUID; toast: ReactElement }>>;
	pushToast: (props: Omit<ToastProps, "id">) => void;
	createList: (name: string) => void;
	removeList: (name: string) => void;
	removeToast: (id: string, listName: string) => void;
	clearToasts: (listName: string) => void;
};

export const ToastStore = create<ToastStoreType>((set, get) => ({
	toasts: {},
	pushToast: ({ UIToast, timeout, listName }) => {
		const id = uuid();

		if (!get().toasts[listName])
			throw new Error(`List with name "${listName}" is missing from the VDOM`);

		return set(
			produce<ToastStoreType>((draft) => {
				draft.toasts[listName].push({
					id,
					toast: (
						<Toast
							key={id}
							id={id}
							listName={listName}
							UIToast={UIToast}
							timeout={timeout}
						/>
					),
				});
			})
		);
	},
	createList: (name: string) =>
		set(
			produce<ToastStoreType>((draft) => {
				draft.toasts[name] = [];
			})
		),
	removeList: (name) =>
		set(
			produce((draft) => {
				delete draft.toasts[name];
			})
		),
	removeToast: (id, listName) =>
		set(
			produce((draft) => {
				if (!draft.toasts[listName]) return;

				const index = draft.toasts[listName].findIndex(
					(n: ToastStoreType["toasts"][string][number]) => n.id === id
				);

				if (index > -1) draft.toasts[listName].splice(index, 1);
			})
		),
	clearToasts: (listName) => get().createList(listName),
}));
