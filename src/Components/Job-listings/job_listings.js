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
            .then(d => this.setState({ data: d }))
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    render() {
        const jobList = this.state.data;
        return (
            <div className="JobData-Master" col-sm-4>

                {jobList.map(item => (
                    <a href={item.how_to_apply}> 
                    <div className="jobField" col-sm-4 >
                        <div className="CompanyImage" col-sm-4>
                            <img src={item.company_logo} alt="Company logo" className="ImageName"></img>
                        </div>
                        {/* add timestamp if possible eg. 5 hours ago */}
                        <p className="JobType">{item.type} </p>
                        <p className="JobTitle">{item.title}</p>
                        <h4 className="CompanyName">{item.company}</h4>
                        <p className="CompanyLocation">{item.location} </p>
                        {/*  */}
                        {/* {item.description} */}
                    </div>
                    </a>
                ))}

            </div>
        );
    }
}
export default Joblisting
