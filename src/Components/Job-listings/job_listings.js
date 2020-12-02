import React, { Component } from 'react';

class Joblisting extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://jobs.github.com/positions.json?'
        fetch(proxyUrl + targetUrl)
            .then(data => data.json())
            .then(d => this.setState({data:d}))
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    render() {
        return (
            <div className="JsonData">
                {
                JSON.stringify(this.state.data)}
            </div>
        );
    }
}
export default Joblisting
//render(<Joblisting />, document.getElementById('root'));