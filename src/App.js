import './App.css';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes/theme';
import { GlobalStyles } from './themes/global';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            titleCompanyExpertise: '',
            location: '',
            page: 0,
            fulltime: false,
            jobList: '',
            theme: 'light'
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleLocChange = this.handleLocChange.bind(this);
        this.handleTitleComExpChange = this.handleTitleComExpChange.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.getPostings = this.getPostings.bind(this);
        this.handleFulltime = this.handleFulltime.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);

    }

    componentDidMount() {
        console.log("in component did mount");
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

    getPostings() {
        const { page, titleCompanyExpertise, location, allData, fulltime } = this.state; //extract state variables to be used
        let previousSearches = allData;

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://jobs.github.com/positions.json?';
        targetUrl = targetUrl + "page=" + page.toString();
        if (location.length > 0) {
            targetUrl = targetUrl + "&location=" + location.toString();
        }
        if (titleCompanyExpertise.length > 0) {
            targetUrl = targetUrl + "&description=" + titleCompanyExpertise.toString();
        }

        if (fulltime === true) {
            targetUrl = targetUrl + "&full_time=" + fulltime.toString();
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
        console.log("Size " + newArray.length);
        this.setState({ allData: newArray });
    }

    handleClick(e) {
        // const {titleCompanyExpertise, location} = this.state;
        // this.setState({titleCompanyExpertise:titleCompanyExpertise, location:location});
        this.getPostings();
        e.preventDefault();
    }

    handleTitleComExpChange(e) {
        this.setState({ titleCompanyExpertise: e.target.value });
    }

    handleLocChange(event) {
        this.setState({ location: event.target.value });
    }

    handleFulltime() {
        var checkBox = document.getElementById("myCheck");
        if (checkBox.checked === true) {
            this.setState({ fulltime: true });
        } else {
            this.setState({ fulltime: false });
        }
    }

    handleLoadMore() {
        var { page } = this.state;
        page = page + 1;
        this.setState({ page: page });
        this.getPostings();
    }

    // The function that toggles between themes
    toggleTheme() {
        // if the theme is not light, then set it to dark
        if (this.state.theme === 'light') {
            this.setState({ theme: 'dark' });
            // otherwise, it should be light
        } else {
            this.setState({ theme: 'light' });
        }
    };

    render() {
        const { allData, page } = this.state;
        console.log("Rendering " + allData.length);
        console.log("page in render " + page);
        return (
            <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
                <div className="App">
                    <div className="Header-Box">
                        <button onClick={this.toggleTheme} className="toggleBtn">Toggle theme</button>
                        <div className="devjobs">
                            <span id="title">devjobs</span>
                        </div>
                    </div>
                    <span>
                        <form className="searchForm">
                            <SearchIcon id="searchIcon" />
                            <label>
                                <input id={"TCE"} type="text" onChange={this.handleTitleComExpChange} value={this.state.titleCompanyExpertise}
                                    placeholder={"Filter by title, company, expertise.."} />
                            </label>
                            <LocationOnIcon id="locationIcon" />
                            <label>
                                <input id={"LOC"} type="text" name="Loc"
                                    placeholder={"Filter by location.."}
                                    onChange={this.handleLocChange} value={this.state.location} />
                            </label>
                            <input type="checkbox" id="myCheck" onClick={this.handleFulltime} />Full time
                        <Button variant="contained" id="submitBtn" color="primary" onClick={this.handleClick}> Search </Button>
                        </form>
                    </span>
                    <div className="JobData-Master">
                        <Grid container spacing={2}>
                            {allData.map(item => (
                                <Grid item xl={4} xs={12} md={3}>
                                    {/* on click open job description */}
                                    <div className="jobField">
                                        {/* key={item.id} */}

                                        {/* <div className="jobField" onClick={e => console.log("Clicked")}>  */}
                                        {/*{item.description}*/}
                                        <div className="CompanyImage">
                                            <img src={item.company_logo} alt="Company logo" className="ImageName"></img>
                                        </div>
                                        {/* add timestamp if possible eg. 5 hours ago  */}
                                        <p className="JobType">{item.type} </p>
                                        <p className="JobTitle">{item.title}</p>
                                        <p className="CompanyName">{item.company}</p>
                                        <p className="CompanyLocation">{item.location} </p>

                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div className="LoadMoreDiv">
                        <Box textAlign='center'>
                            <Button variant='contained' id="loadBtn" color="primary" onClick={this.handleLoadMore}>
                                Load More
                        </Button>
                        </Box>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}


export default App;