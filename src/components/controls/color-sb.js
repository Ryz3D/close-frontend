import React from "react";
import * as sui from "semantic-ui-react";
import sb from "../../img/sb.png";
import CloseRest from "../../data/closeRest";

class CColorSB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            hue: 0,
        };
        if (!this.props.varH) {
            console.error("CColorSB: No varH given");
        }
        if (!this.props.varS) {
            console.error("CColorSB: No varS given");
        }
        if (!this.props.varB) {
            console.error("CColorSB: No varB given");
        }
        this.colorRef = React.createRef();
    }

    updateSize(cb = _ => { }) {
        const br = this.colorRef.current.getBoundingClientRect();
        this.setState({
            w: br.width,
            h: br.height,
        }, _ => cb());
    }

    componentDidMount() {
        this.updateSize(_ => {
            if (this.props.varH && this.props.varS && this.props.varB) {
                CloseRest.varGet(this.props.varS)
                    .then(d => this.setState({ x: d * this.state.w / 100 }));
                CloseRest.varGet(this.props.varB)
                    .then(d => this.setState({ y: (100 - d) * this.state.h / 100 }));
                CloseRest.varGet(this.props.varH)
                    .then(hue => this.setState({ hue }));

                this.closeSub1 = CloseRest.varSub(this.props.varS, d => this.setState({ x: d * this.state.w / 100 }));
                this.closeSub2 = CloseRest.varSub(this.props.varB, d => this.setState({ y: (100 - d) * this.state.h / 100 }));
                this.closeSub3 = CloseRest.varSub(this.props.varH, hue => this.setState({ hue }));
            }
        });
    }

    componentWillUnmount() {
        if (this.closeSub1) {
            this.closeSub1();
        }
        if (this.closeSub2) {
            this.closeSub2();
        }
        if (this.closeSub3) {
            this.closeSub3();
        }
    }

    send() {
        if (this.props.varS && this.props.varB) {
            CloseRest.varSet(this.props.varS, Math.round(100 * this.state.x / this.state.w));
            CloseRest.varSet(this.props.varB, Math.round(100 * (1 - this.state.y / this.state.h)));
        }
    }

    prevent(e) {
        e.preventDefault();
    }

    end(e) {
        if (this.sendInterval) {
            clearInterval(this.sendInterval);
            this.sendInterval = undefined;
        }
    }

    move(e, doSend = false) {
        this.prevent(e);

        var pos;
        if (e.targetTouches) {
            pos = e.targetTouches[0];
        }
        else {
            pos = e;
            if (e.buttons !== 1) {
                return false;
            }
        }
        const br = this.colorRef.current.getBoundingClientRect();
        const x = pos.clientX;
        const y = pos.clientY;
        this.updateSize(_ => {
            this.setState({
                x: Math.min(this.state.w, Math.max(0, x - br.left)),
                y: Math.min(this.state.h, Math.max(0, y - br.top)),
            }, _ => {
                if (!this.sendInterval || doSend) {
                    this.send();
                }
                if (!this.sendInterval) {
                    this.sendInterval = setInterval(_ => this.send(), this.props.interval || 500);
                }
            });
        });
        return false;
    }

    render() {
        const color = {
            height: '200px',
            backgroundColor: '#777',
            touchAction: 'none',
            backgroundImage: `url(${sb})`,
            backgroundSize: '100% 100%',
            filter: `hue-rotate(${this.state.hue}deg)`,
        };
        const marker = {
            position: 'absolute',
            left: `calc(${this.state.x}px - 0.5em)`,
            top: `calc(${this.state.y}px - 0.5em)`,
            margin: 0,
            padding: 0,
        };

        return (
            <div style={color} ref={this.colorRef}
                onTouchStart={e => { this.prevent(e); this.send() }} onMouseDown={e => this.move(e, true)}
                onTouchEnd={e => this.end(e)} onMouseUp={e => this.end(e)} onMouseLeave={e => this.end(e)}
                onMouseMove={e => this.move(e)} onTouchMove={e => this.move(e)}
            >
                <sui.Icon name="circle outline" style={marker} color="grey" />
                <sui.Icon name="dot circle" style={marker} inverted />
            </div>
        );
    }
}

export default CColorSB;
