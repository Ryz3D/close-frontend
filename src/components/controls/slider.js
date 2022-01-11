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
        this.sliderRef = React.createRef();
    }

    componentDidMount() {
        CloseRest.varGet(this.props.var)
            .then(value => this.setState({
                value: parseFloat(value),
                last: parseFloat(value),
            }));
        this.closeSub = CloseRest.varSub(this.props.var,
            value => this.setState({
                value: parseFloat(value),
                last: parseFloat(value),
            }));
        this.sliderRef.current.addEventListener("wheel", e => this.scrollFunc(e), { passive: false });
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

    scrollFunc(e) {
        const mi = this.props.min || 0;
        const mx = this.props.max || 100;
        this.setState({
            value: Math.max(mi, Math.min(mx, this.state.value - e.deltaY * 0.05)),
        }, _ => this.send());
        e.preventDefault();
        return false;
    }

    disableScroll() {
        const x = window.scrollX;
        const y = window.scrollY;
        document.getElementsByClassName("pusher")[0].addEventListener("scroll", e => this.scrollFunc(e, x, y));
    }

    enableScroll() {
        document.getElementsByClassName("pusher")[0].removeEventListener("scroll", this.scrollFunc);
    }

    render() {
        const roundFactor = 10 ** (this.props.labelPrecision || 0);
        const mi = this.props.min || 0;
        const mx = this.props.max || 100;
        var perc = (this.state.value - mi) / (mx - mi) * 100;

        const buffer = {
            width: '100%',
            height: this.props.vertical ? '220px' : '70px',
        };
        const root = {
            position: 'absolute',
            top: this.props.vertical ? '100px' : '50%',
            left: '50%',
            height: this.props.vertical ? '60px' : '50px',
            width: this.props.vertical ? '175px' : '100%',
            transform: `translate(-50%, -50%) ${this.props.vertical ? 'rotate(-90deg)' : ''}`,
        };
        const slider = {
            WebkitAppearance: "none",
            width: this.props.vertical ? '175px' : '100%',
            height: this.props.vertical ? '40px' : '7px',
            borderRadius: '3px',
        };

        if (this.props.color === "hue") {
            // f = c => `linear-gradient(to right, ${[...new Array(c).keys()].map(v => `hsl(${v * 360 / (c - 1)}, 100%, 50%) ${v / (c - 1) * 100}%`).join(', ')});`
        }
        else if (this.props.color !== undefined) {
            const clr = this.props.color;
            slider.background = `linear-gradient(to right, #${clr} 0%, #${clr} ${perc}%, #eee ${perc}%, #eee 100%)`;
        }
        else {
            slider.background = `linear-gradient(to right, #9f35cc 0%, #b75bde ${perc}%, #eee ${perc}%, #eee 100%)`;
        }

        return (
            <>
                <div style={buffer} />
                <div className="csliderroot" style={root}>
                    {this.props.rating ?
                        <sui.Rating icon="star" maxRating="10" clearable rating={Math.round(10 * this.state.value / mx)}
                            onRate={(_, { rating, maxRating }) => this.setState({ value: 100 * rating / maxRating }, _ => this.send())}>
                        </sui.Rating>
                        :
                        <input type="range" ref={this.sliderRef}
                            className={`cslider${this.props.vertical ? " vertical" : ""}${this.props.color === "hue" ? " hue" : ""}`}
                            style={slider}
                            orient={this.props.vertical ? "vertical" : ""}
                            value={this.state.value} min={mi} max={mx}
                            step={this.props.step || "any"}
                            onMouseDown={_ => this.startSend()}
                            onPointerDown={_ => this.startSend()}
                            onMouseUp={_ => this.stopSend()}
                            onPointerUp={_ => this.stopSend()}
                            onChange={e => this.setState({ value: e.target.value })} />
                    }
                    {!this.props.hideLabel &&
                        <div style={{ textAlign: 'left' }}>
                            <sui.Label basic ribbon={!this.props.vertical} pointing="above">
                                {(this.props.labelConv || (v => `${v}%`))(Math.round((perc + Number.EPSILON) * roundFactor) / roundFactor)}
                            </sui.Label>
                        </div>
                    }
                </div>
            </>
        );
    }
}

export default CSlider;
