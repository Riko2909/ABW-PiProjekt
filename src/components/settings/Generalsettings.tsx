import axios from "axios";
import React from "react";

interface Probs {
    manuell: boolean
    onClick: any
}

type StateProps = {
	manuell: boolean;
};

class Settings extends React.Component<Probs, StateProps> {

    constructor(probs: Probs) {
        super(probs);
        
        this.state = {
            manuell: probs.manuell
        }
    }

	async componentDidMount() {
		await axios.get("http://10.42.0.2:3001/", {timeout: 40}).then((res) => {
			/*this.setState({
			      colorwheel : res.data.post
			})*/
		}).catch((err: Error) => {
                  console.log("Keine Verbindung zum Backend");
            })

	}

    async updateColor(key: string) {
		await this.setState({
            manuell: !this.state.manuell
        });

        await axios.post("http://10.42.0.2:3001/", {
			manuell: this.state.manuell,
		});

	}

    render() {
        return (
            <div>
                {/* @ts-ignore */}
                <button onClick={this.props.onClick} >State {this.state.manuell}</button>
            </div>
        )
    }
}

export default Settings