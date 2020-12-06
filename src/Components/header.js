import { Component } from "react";

class Heading extends Component{
    constructor(props) {
        super(props);
        this.openDarkMode = this.openDarkMode.bind(this);
    }
    openDarkMode() {

    }
    render() {
        return <div className="Header-Box">
            <div className="toggle">
                <button className="toggleBtn" onClick={this.openDarkMode}> Dark mode</button>
            </div>
            <div className="devjobs">
                <span id="title">devjobs</span>
            </div>
        </div>
    }
}
        


document.documentElement.classList.remove('no-js');


export default Heading