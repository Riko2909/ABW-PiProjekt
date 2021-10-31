import React from "react";
import "./App.css";
import axios from "axios";
import { NoProps } from "./type-declarations/types";
import Colorpicker from "./components/colorpicker/Colorpicker";

// function App() {

//   setInterval(() => {
//     fetchit();
//   }, 1000)

//   return (
//     <div className="App">
//       Test
//     </div>
//   );
//
type StateProps = {
	luxArray: Array<string>;
	refreshInterval: number;
	requestTimeout: number;
};
class App extends React.Component<NoProps, StateProps> {
	constructor(props: NoProps) {
		super(props);

		this.state = {
			luxArray: [],
			refreshInterval: 1,
			requestTimeout: 4,
		};
	}

	async fetchit() {
		axios.get("http://192.168.1.72:3001/", { timeout: this.state.requestTimeout })
			.then((res) => {

				let data = res.data["GET"]

				if(data?.[0]?.["luxMS"] === undefined)
					return

				this.setState((prev) => ({
					luxArray: [
						...prev.luxArray,
						JSON.stringify(res.data["GET"][0]["luxMS"]),
					],
				}));

				console.log(res.data);
			})
			.catch((err) => {
				return;
			});
	}

	componentDidMount() {
		setInterval(() => {
			this.fetchit();
		}, this.state.refreshInterval * 1000);
	}

	render() {
		return (
			<div className="App">
				<h2>Colorpicker</h2>
				<Colorpicker />
				<footer>
					Letzter Lichtwert:
					<div className="lux-val">
						{/* @ts-ignore */}
						{this.state.luxArray[this.state.luxArray.length - 1]}
					</div>
				</footer>
			</div>
		);
	}
}

export default App;
