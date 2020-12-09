import './App.css';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import moment from 'moment';
// import Test from './Test.js'
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
            theme: 'light',
            userLoc: true,
            latitude: '',
            longitude: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleLocChange = this.handleLocChange.bind(this);
        this.handleTitleComExpChange = this.handleTitleComExpChange.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.getPostings = this.getPostings.bind(this);
        this.handleFulltime = this.handleFulltime.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        this.position = this.position.bind(this);
        this.handleJobsNearYou = this.handleJobsNearYou.bind(this);
    }
    position = async () => {
         navigator.geolocation.getCurrentPosition(
            position => this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, newState => console.log(newState))
        );
        console.log(this.state.latitude);
        console.log(this.state.longitude);
    };

    componentDidMount() {
        this.position();
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://jobs.github.com/positions.json?';
        console.log("target URL", targetUrl);
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

    handleJobsNearYou() {
        const { latitude, longitude, } = this.state; //extract state variables to be used

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://jobs.github.com/positions.json?';

        // targetUrl = targetUrl + "lat=52.52008&long=13.4050"; // Berlin co-ordinates, will get you only Berlin jobs
        targetUrl = targetUrl + "lat=" + latitude.toString() + "&long=" + longitude.toString();

        fetch(proxyUrl + targetUrl)
            .then(allData => allData.json())
            .then(d => this.setState({ allData: d }))
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    render() {
        const { allData, page } = this.state;
        console.log("Rendering " + allData.length);
        console.log("page in render " + page);
        return (
            <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
                <div className="App">
                    {/* header divs */}
                    <div className="Header-Box">
                        <button onClick={this.toggleTheme} className="toggleBtn">Toggle theme</button>
                        <div className="devjobs">
                            <span id="title">devjobs</span>
                        </div>
                    </div>
                    {/* search bar divs */}
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
                            <Button variant="contained" id="submitBtn" color="primary" onClick={this.handleJobsNearYou}> Current Location Jobs </Button>
                        </form>
                    </span>
                    {/* displaying jobs */}
                    <div className="JobData-Master">
                        <Grid container spacing={2}>
                            {allData.map(item => (

                                <Grid item xl={4} xs={12} md={3}>
                                    <div className="jobField">
                                        {/*{item.description}*/}
                                        <div className="CompanyImage">
                                            <img src={item.company_logo} alt="Company logo" className="ImageName"></img>
                                        </div>
                                        <p className="JobType">{moment(item.created_at).fromNow()} . {item.type} </p>
                                        <p className="JobTitle">{item.title}</p>
                                        <p className="CompanyName">{item.company}</p>
                                        <p className="CompanyLocation">{item.location} </p>
                                        <a href={item.url} className="Applyhere">Apply here</a>
                                        {/* <a href="#lightbox-1" rel="lightbox" className="Applyhere">Open description</a>
                                        <div class="lightbox" id="lightbox-1">
                                            {/* {item.description} */}
                                            {/* <Test data={item}/>
                                        <a class="lightbox__close" href="{item}">X</a></div>  */}
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    {/* displaying load more button for pagination */}
                    {allData.length > 0 ? <div className="LoadMoreDiv">
                        <Box textAlign='center'>
                            <Button variant='contained' id="loadBtn" color="primary" onClick={this.handleLoadMore}> Load More
                     </Button>
                        </Box>
                    </div> : <div className="notFound">No Results Found..</div>}
                </div>
            </ThemeProvider>
        );
    }
}




export default App;