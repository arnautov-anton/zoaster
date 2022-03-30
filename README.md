# ZOASTER

Toasty React libary

### Fix typing (Parcel bundling)

This code:

```tsx
import { useMemo } from "react";
import { ToastStore, ToastStoreType } from "../context";

export const useToast = () => {
	const { removeToast, pushToast, clearToasts } = useMemo(
		() => ToastStore.getState(),
		[]
	);

	return { removeToast, pushToast, clearToasts };
};
```

produces this output in the `types.d.ts`:

```tsx
// these types could be fine if the import worked
// the ToastProps are also defined in the types.d.ts file
// which makes the import unnecessary
export const useToast: () => {
	removeToast: (id: string, listName: string) => void;
	pushToast: (
		props: Pick<
			// this import does not work
			import("components").ToastProps,
			"listName" | "timeout" | "UIToast"
		>
	) => void;
	clearToasts: (listName: string) => void;
};
```

Adding casting to the `useToast`'s return value:

```tsx
as Pick<ToastStoreType, "removeToast" | "pushToast" | "clearToasts">
```

actually produces the right `types.d.ts` output (yet the casting is excessive as the typing is correct):

```tsx
export const useToast: () => Pick<
	ToastStoreType,
	"pushToast" | "removeToast" | "clearToasts"
>;
```
