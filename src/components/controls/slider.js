import "./slider.css";
import React from "react";
import * as sui from "semantic-ui-react";
import CloseRest from "../../data/closeRest";

class CSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            last: 0,
        };
        if (!this.props.var) {
            console.error("CSlider: No var given");
        }
    }

    componentDidMount() {
        CloseRest.varGet(this.props.var)
            .then(value => this.setState({
                value: parseFloat(value),
                last: parseFloat(value)
            }));
        this.closeSub = CloseRest.varSub(this.props.var,
            value => this.setState({
                value: parseFloat(value),
                last: parseFloat(value)
            }));
    }

    componentWillUnmount() {
        this.closeSub();
    }

    startSend() {
        this.send();
        this.int = setInterval(_ => this.send(), this.props.interval || 500);
    }

    stopSend() {
        if (this.int) {
            clearInterval(this.int);
        }
    }

    send() {
        if (this.props.var) {
            if (this.state.value !== this.state.last) {
                CloseRest.varSet(this.props.var, this.state.value, this.props.forceSend);
                this.setState({ last: this.state.value });
            }
        }
    }

    render() {
        const roundFactor = 10 ** (this.props.labelPrecision || 0);
        const mi = this.props.min || 0;
        const mx = this.props.max || 100;
        var perc = (this.state.value - mi) / (mx - mi) * 100;

        const slider = {
            WebkitAppearance: "none",
            background: `linear-gradient(to right, #9f35cc 0%, #b75bde ${perc}%, #fff ${perc}%, #fff 100%)`,
            width: '300px',
            height: '5px',
        };

        return <>
            <div className="csliderroot">
                {this.props.rating ?
                    <sui.Rating icon="star" maxRating="10" clearable
                        onRate={(_, { rating, maxRating }) => this.send(rating / maxRating)}>
                        <i>hello</i>
                    </sui.Rating>
                    :
                    <input type="range" className="cslider" style={slider}
                        value={this.state.value} min={mi} max={mx}
                        step={this.props.step || "any"}
                        onScroll={e => console.log(e)}
                        onMouseDown={_ => this.startSend()}
                        onPointerDown={_ => this.startSend()}
                        onMouseUp={_ => this.stopSend()}
                        onPointerUp={_ => this.stopSend()}
                        onChange={e => this.setState({ value: e.target.value })} />
                }
                {!this.props.hideLabel &&
                    <sui.Label>
                        {(this.props.labelConv || (v => `${v}%`))(Math.round((perc + Number.EPSILON) * roundFactor) / roundFactor)}
                    </sui.Label>
                }
            </div>
        </>;
    } // TODO: SEND IN INTERVALS WHILE MOVING
}

export default CSlider;
