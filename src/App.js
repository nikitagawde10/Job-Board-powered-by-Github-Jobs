// <Heading/>

// <JobListing/>
import './App.css';
import Heading from './Components/header';
import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            titleCompanyExpertise: '',
            location: '',

        };
        this.handleClick = this.handleClick.bind(this);
        this.handleLocChange = this.handleLocChange.bind(this);
        this.handleTitleComExpChange = this.handleTitleComExpChange.bind(this);
    }

    componentDidMount() {
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://jobs.github.com/positions.json?';
        fetch(proxyUrl + targetUrl)
            .then(allData => allData.json())
            .then(d => this.setState({ allData: d }))
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    handleClick(e){
        // console.log(this.state.titleCompanyExpertise);
        // console.log(this.state.location);
        const {titleCompanyExpertise, location} = this.state;
        this.setState({titleCompanyExpertise:titleCompanyExpertise, location:location })
        e.preventDefault();
    }

    handleTitleComExpChange(e){
        this.setState({titleCompanyExpertise: e.target.value});
    }

    handleLocChange(event){
        this.setState({location: event.target.value});
    }

    render() {
        const jobListAll = this.state.allData;
        const {titleCompanyExpertise,location } = this.state;
        let jobList = [];
        if (titleCompanyExpertise.length < 1 && location.length < 1)
        {
            jobList = jobListAll;
        } else if (titleCompanyExpertise.length < 1 && location.length > 0){
            jobList = jobListAll.filter(job => job.location.toLowerCase().indexOf(location.toLowerCase()) > -1);

        } else if (titleCompanyExpertise.length > 0 && location.length < 1){
            jobList = jobListAll.filter(job => job.company.toLowerCase().indexOf(titleCompanyExpertise.toLowerCase()) > -1 ||
                job.title.toLowerCase().indexOf(titleCompanyExpertise.toLowerCase()) > -1 ||
                job.description.toLowerCase().indexOf(titleCompanyExpertise.toLowerCase()) > -1);

        } else {
            jobList = jobListAll.filter(job => (job.company.toLowerCase().indexOf(titleCompanyExpertise.toLowerCase()) > -1 ||
                job.title.toLowerCase().indexOf(titleCompanyExpertise.toLowerCase()) > -1 ||
                job.description.toLowerCase().indexOf(titleCompanyExpertise.toLowerCase()) > -1 ) &&
                job.location.toLowerCase().indexOf(location.toLowerCase()) > -1);
        }
        return (

    <div className="App">
     <Heading/>
        <span>
             <form>

              <label>
                <input id={"TCE"} type="text" onChange={this.handleTitleComExpChange} value={this.state.titleCompanyExpertise}
                       placeholder={"Filter by title, company, expertise.."} />
              </label>

                 <label>
                     <input id={"LOC"} type="text" name="Loc"
                            placeholder={"Filter by location.."}
                     onChange={this.handleLocChange}  value={this.state.location} />
                 </label>

              <input type="submit" id="submitBtn" value="Search" onClick={this.handleClick}/>
            </form>
        </span>

        <div className="JobData-Master" col-sm-4="true">

            {jobList.map(item => (
                <a href={item.how_to_apply}>
                    <div className="jobField" col-sm-4="true" >
                        <div className="CompanyImage" col-sm-4="true">
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
    </div>
  );}
}


export default App;