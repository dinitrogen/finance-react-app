import React from "react";
import { StyledButton, StyledInput } from "./StyledComponents";


const SearchBar = ({clicked, ticker, handleChange, coolDown}) => {
    
    return (
        <div>
            <form className="searchForm">
                
                <label><h3>Ticker Search</h3>
                    <StyledInput
                        id="searchBar"
                        placeholder="Search for ticker (eg. VTI)"
                        value={ticker}
                        onChange={handleChange} />
                </label>
                <StyledButton
                    primary={!coolDown}
                    onClick={clicked}
                    disabled={coolDown}>
                        Search
                </StyledButton>
            </form>
            
        </div>
    );
}

export default SearchBar;