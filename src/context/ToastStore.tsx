import { v4 as uuid } from "uuid";
import { ReactElement, Fragment } from "react";
import create from "zustand";
import { produce } from "immer";

import { Toast, ToastProps } from "../components";

type UUID = string;

export type ToastStoreType = {
	toasts: Record<string, Array<{ id: UUID; toast: ReactElement }>>;
	pushToast: (
		props: Required<Pick<ToastProps, "UIToast" | "listName">> &
			Partial<
				Pick<
					ToastProps,
					"ToastWrapperComponent" | "displayDuration" | "afterDisplayDuration"
				>
			>
	) => UUID;
	createList: (name: string) => void;
	removeList: (name: string) => void;
	removeToast: (id: string, listName: string) => void;
	clearToasts: (listName: string) => void;
};

export const ToastStore = create<ToastStoreType>((set, get) => ({
	toasts: {},
	pushToast: ({
		UIToast,
		displayDuration = 5000,
		afterDisplayDuration = 500,
		listName,
		ToastWrapperComponent = Fragment,
	}) => {
		const id = uuid();

		if (!get().toasts[listName])
			throw new Error(`List with name "${listName}" is missing from the VDOM`);

		set(
			produce<ToastStoreType>((draft) => {
				draft.toasts[listName].push({
					id,
					toast: (
						<Toast
							key={id}
							id={id}
							ToastWrapperComponent={ToastWrapperComponent}
							listName={listName}
							UIToast={UIToast}
							displayDuration={displayDuration}
							afterDisplayDuration={afterDisplayDuration}
						/>
					),
				});
			})
		);

		return id;
	},
	createList: (name: string) =>
		set(
			produce<ToastStoreType>((draft) => {
				draft.toasts[name] = [];
			})
		),
	removeList: (name) =>
		set(
			produce<ToastStoreType>((draft) => {
				delete draft.toasts[name];
			})
		),
	removeToast: (id, listName) =>
		set(
			produce<ToastStoreType>((draft) => {
				if (!draft.toasts[listName]) return;

				const index = draft.toasts[listName].findIndex((n) => n.id === id);

				if (index > -1) draft.toasts[listName].splice(index, 1);
			})
		),
	clearToasts: (listName) => get().createList(listName),
}));

ToastStore.subscribe((c) => console.log(c.toasts["john"]));
