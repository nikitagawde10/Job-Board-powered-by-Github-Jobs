import React, { Component } from 'react';

class Joblisting extends Component {
    constructor() {
        super();
        this.state = {
            data: ''
        };
    }
    componentDidMount() {
        //fetch('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?')
        // .then(data => data.json())
        // .then(d=>this.setState({data:d}))
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://jobs.github.com/positions.json?description=python'
        fetch(proxyUrl + targetUrl)
            // .then(blob => blob.json())
            // .then(data => {
            //     console.table(data);
            //     document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
            //     return data;
            // })
            .then(data => data.json())
            .then(d=>this.setState({data:d}))
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    render() {
        return (
            <div className="JsonData">
                {JSON.stringify(this.state.data)}
            </div>
        );
    }
}
export default Joblisting
//render(<Joblisting />, document.getElementById('root'));