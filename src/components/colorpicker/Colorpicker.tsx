import axios from "axios";
import React from "react";
import { NoProps } from "../../type-declarations/types";
import Settings from "../settings/Generalsettings";
import "./Colorpicker.css";

type colors = {
	r: boolean;
	g: boolean;
	b: boolean;
};

type StateProps = {
	colorwheel: colors;
	manualState: boolean;
};

class Colorpicker extends React.Component<NoProps, StateProps> {
	constructor(params: NoProps) {
		super(params);

		this.state = {
			colorwheel: {
				r: false,
				g: false,
				b: false,
			},
			manualState: false
		};
	}

	async componentDidMount() {
		await axios.get("http://10.42.0.2:3001/settings", {timeout: 40}).then((res) => {
			
			let newState: any = res.data.post

			if(newState.length < 1)
				return

			this.setState({
			      colorwheel : newState.colorwheel,
				  manualState: newState.manualState
			})
		}).catch((err: Error) => {
                  console.log("Keine Verbindung zum Backend");
            })

	}

	togglekey(key: string) {
		switch (key) {
			case "r":
				return !this.state.colorwheel.r;
			case "g":
				return !this.state.colorwheel.g;
			case "b":
				return !this.state.colorwheel.b;
		}
	}

	async updateColor(key: string) {
		await this.setState({
			colorwheel: Object.assign({}, this.state.colorwheel, {
				[key]: this.togglekey(key),
			}),
		});

		await axios.post("http://10.42.0.2:3001/settings", {
			colorwheel: this.state,
		});
	}

	async updateState() {
		await this.setState({
			manualState: !this.state.manualState
		});

		await axios.post("http://10.42.0.2:3001/settings", {
			colorwheel: this.state,
		});		

		console.log(this.state);
		
	}

	render() {
		return (
			<div>
				<div className="colorpicker" style={this.updateBG()}>
					<button
						className={
							this.state.colorwheel.r
								? "active"
								: undefined
						}
						onClick={() => this.updateColor("r")}
					>
						RED
					</button>
					<button
						className={
							this.state.colorwheel.g
								? "active"
								: undefined
						}
						onClick={() => this.updateColor("g")}
					>
						GREEN
					</button>
					<button
						className={
							this.state.colorwheel.b
								? "active"
								: undefined
						}
						onClick={() => this.updateColor("b")}
					>
						BLUE
					</button>
				</div>
				<Settings manuell={this.state.manualState} onClick={() => this.updateState()} />
			</div>
		);
	}

	updateBG(): React.CSSProperties {
		return {
			background: `rgba(${255 * Number(this.state.colorwheel.r)},
                                   ${255 * Number(this.state.colorwheel.g)},
                                   ${255 * Number(this.state.colorwheel.b)}, 0.8)`,
		};
	}
}

export default Colorpicker;
