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
			refreshInterval: 0.5,
			requestTimeout: 100
		};
	}

	async fetchit() {
		axios.get("http://10.42.0.2:3001/", { timeout: this.state.requestTimeout })
			.then((res) => {
				
				let data = res.data["get"]

				if(data?.[0]?.["voltage"] === undefined)
					return
				
				this.setState((prev) => ({
					luxArray: [
						...prev.luxArray,
						JSON.stringify(res.data["get"][0]["voltage"]),
					],
				}));
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
				<div>
					<h2>Colorpicker</h2>
				</div>
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
