import './App.css';
import Heading from './Components/header';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            titleCompanyExpertise: '',
            location: '',
            page : 0,
            fulltime: false,

        };
        this.handleClick = this.handleClick.bind(this);
        this.handleLocChange = this.handleLocChange.bind(this);
        this.handleTitleComExpChange = this.handleTitleComExpChange.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.getPostings = this.getPostings.bind(this);
    }

    componentDidMount() {
        console.log("in component didmpunt");
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

    getPostings(){
        const {page,titleCompanyExpertise,location, allData, fulltime} = this.state;
        let previousSearches = allData;

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://jobs.github.com/positions.json?';
        targetUrl = targetUrl + "page=" + page.toString();
        if(location.length > 0){
            targetUrl = targetUrl + "&" + "location=" + location.toString();
        }
        if(titleCompanyExpertise.length > 0){
            targetUrl = targetUrl + "&" + "description=" + titleCompanyExpertise.toString();
        }

        if(fulltime === true){
            targetUrl = targetUrl + "&" + "full_time=" + fulltime.toString();
        }

        fetch(proxyUrl + targetUrl)
            .then(allData => allData.json())
            .then(d => this.setState({ allData: d }))
            .catch(e => {
                console.log(e);
                return e;
            });

        const newArray = allData.concat(previousSearches);
        console.log("previous " + previousSearches.length);
        console.log("Size "+newArray.length);
        this.setState({allData: newArray});
    }

    handleClick(e){
        const {titleCompanyExpertise, location} = this.state;
        this.setState({titleCompanyExpertise:titleCompanyExpertise, location:location, page: 0 });
        this.getPostings();
        e.preventDefault();
    }

    handleTitleComExpChange(e){
        this.setState({titleCompanyExpertise: e.target.value});
    }

    handleLocChange(event){
        this.setState({location: event.target.value});
    }

    handleFulltime(){
        var checkBox = document.getElementById("myCheck");
        if (checkBox.checked === true){
            this.setState({fulltime:true});
        } else {
            this.setState({fulltime:false});
        }
    }

    handleLoadMore(){
        var {page} = this.state;
        page = page + 1;
        this.setState({page: page});
        this.getPostings();
    }


    render() {
        const {allData, page} = this.state;
        console.log("Rendering "+allData.length);
        console.log("page in render "+ page);
        return (

            <div className="App">
                <Heading />
                <span>
                    <form>
                        <label>
                            <input id={"TCE"} type="text" onChange={this.handleTitleComExpChange} value={this.state.titleCompanyExpertise}
                                   placeholder={"Filter by title, company, expertise.."} />
                        </label>

                        <label>
                            <input id={"LOC"} type="text" name="Loc"
                                   placeholder={"Filter by location.."}
                                   onChange={this.handleLocChange} value={this.state.location} />
                        </label>
                        Full time <input type="checkbox" id="myCheck" onclick={this.handleFulltime}/>
                        <Button variant="contained" id="submitBtn" color="primary" onClick={this.handleClick}> Search </Button>
                    </form>
                </span>
                <div className="JobData-Master" col-sm-4="true">
                    <Grid container spacing={2}>
                        {allData.map(item => (
                            <Grid item xl={4} xs={12} md={3}>
                                <div className="jobField" col-sm-4="true" >
                                    <div className="CompanyImage" col-sm-4="true">
                                        <img src={item.company_logo} alt="Company logo" className="ImageName"></img>
                                    </div>
                                    {/* add timestamp if possible eg. 5 hours ago  */}
                                    <p className="JobType">{item.type} </p>
                                    <p className="JobTitle">{item.title}</p>
                                    <h4 className="CompanyName">{item.company}</h4>
                                    <p className="CompanyLocation">{item.location} </p>
                                    {/* {item.description} */}
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className="LoadMoreDiv">
                    <Box textAlign='center'>
                        <Button variant='contained'id="loadBtn" color="primary" onClick={this.handleLoadMore}>
                            Load More
                        </Button>
                    </Box>
                </div>
            </div>
        );}
}


export default App;