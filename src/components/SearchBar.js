import React from "react";

const SearchBar = ({clicked, ticker, handleChange}) => {
    
    return (
        <div>
            <form className="searchForm">
                <label>Ticker:
                    <input
                        id="searchBar"
                        value={ticker}
                        onChange={handleChange} />
                </label>
                <button onClick={clicked}>Search</button>
            </form>
            
        </div>
    );
}

export default SearchBar;