import React from 'react';
import * as sui from 'semantic-ui-react';
import Header from '../components/header';
import CSlider from "../components/controls/slider";

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
                <CSlider var="balken_brightness" />
                <p>
                    Balken Power
                </p>
                <CSlider var="balken_power" min={0} max={1} step={1}
                    labelConv={v => v >= 0.5 ? "On" : "Off"} />
                <p>
                    Klotz Helligkeit
                </p>
                <CSlider var="klotz" />
            </div>
        );
    }
}

export default HomePage;
