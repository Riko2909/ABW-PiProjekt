import axios from "axios";
import React from "react";
import { NoProps } from "../../type-declarations/types";
import "./Colorpicker.css";

type colors = {
	r: boolean;
	g: boolean;
	b: boolean;
};

type StateProps = {
	colorwheel: colors;
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
		};
	}

	async componentDidMount() {
		await axios.get("http://192.168.1.72:3001/colors", {timeout: 4}).then((res) => {
			this.setState({
			      colorwheel : res.data.post
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

		await axios.post("http://192.168.1.72:3001/colors", {
			colorwheel: this.state.colorwheel,
		});
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
