import React, { Component } from 'react';

class SearchBar extends Component {
    

    render() {
        return (
            <div className="SearchBar">
                <form>
                    <input type="text" placeholder="Filter by title, company expertise..." /> 
                    <input type="text" placeholder="Filter by Location..." /> 
                        <input type="checkbox" className="fulltimeBtn" />
                         Full time only
                    
                    <button className="searchBtn">Search</button>
                </form>
            </div>
        );
    }
}


export default SearchBar
