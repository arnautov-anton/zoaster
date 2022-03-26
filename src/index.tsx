export { ToastList } from "./components";
export type { ToastListProps, ToastProps } from "./components";
export { useToast, useToastContext } from "./hooks";
export type { ToastStoreType } from "./context";

// const CustomComponent = ({ dismiss }) => {
// 	return <h1 onClick={dismiss}>mytext</h1>;
// };

// const CustomWrapperComponent = ({ children }) => <div>{children}</div>;

// export default function App() {
// 	const { pushNotification, clearNotifications } = useStore.getState();
// 	const [state, setState] = useState(true);

// 	return (
// 		<div className="App">
// 			<button onClick={() => setState((pv) => !pv)}>list toggle</button>
// 			<h1
// 				onClick={() =>
// 					pushNotification({
// 						UIComponentOrElement: CustomComponent,
// 						listName: "john",
// 						timeout: 1000,
// 					})
// 				}
// 			>
// 				Hello CodeSandbox
// 			</h1>
// 			<h2 onClick={() => clearNotifications("john")}>
// 				Start editing to see some magic happen!
// 			</h2>
// 			{state && (
// 				<NotificationList
// 					WrapperComponent={CustomWrapperComponent}
// 					name="john"
// 				/>
// 			)}
// 		</div>
// 	);
// }
