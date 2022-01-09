import React from 'react';
import * as sui from 'semantic-ui-react';
import Header from '../components/header';
import CSlider from "../components/controls/slider";
import CButton from '../components/controls/button';
import CText from '../components/controls/text';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Header>
                    Home
                </Header>
                <p>
                    Balken Helligkeit
                </p>
                <CSlider var="balkenBrightness" />
                <p>
                    Balken Schalter
                </p>
                <CSlider var="balkenSwitch" min={0} max={1} step={1}
                    labelConv={v => v >= 0.5 ? "On" : "Off"} />
                <p>
                    Röhre (Verbraucht <CText var="roehreSensor" />W)
                </p>
                <CSlider var="roehreSwitch" min={0} max={1} step={1}
                    labelConv={v => v >= 0.5 ? "On" : "Off"} />
                <p>
                    Rollladen
                </p>
                <sui.Button.Group secondary>
                    <CButton forceSend var="rolli" value="UP" icon="chevron up" />
                    <CButton forceSend var="rolli" value="STOP" icon="stop circle" />
                    <CButton forceSend var="rolli" value="DOWN" icon="chevron down" />
                </sui.Button.Group>
                <p>
                    Lucas Stecki (Verbraucht <CText var="steckiSensor" />W)
                </p>
                <CSlider var="steckiSwitch" min={0} max={1} step={1}
                    labelConv={v => v >= 0.5 ? "On" : "Off"} />
                <p>
                    Lucas Rolli
                </p>
                <sui.Button.Group secondary>
                    <CButton forceSend var="rolli2" value="UP" icon="chevron up" />
                    <CButton forceSend var="rolli2" value="STOP" icon="stop circle" />
                    <CButton forceSend var="rolli2" value="DOWN" icon="chevron down" />
                </sui.Button.Group>
            </div>
        );
    }
}

export default HomePage;
