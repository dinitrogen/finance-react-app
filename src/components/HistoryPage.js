import React from "react";
import DisplayCard from "./DisplayCard";
import { StyledButton } from "./StyledComponents";

const HistoryPage = ({tickers, handleClick}) => {

    return(
        <div>
            <div>History</div>
            {tickers.slice(0, 10).map((ticker) => {
                return(
                    <DisplayCard
                    key={ticker.key}
                    headerText={ticker.headerText}
                    bodyText={ticker.bodyText}
                    footerText={ticker.footerText} />
                        
                );
            })}

            <StyledButton onClick={handleClick}>Clear history</StyledButton>

        </div>
    )
}

export default HistoryPage;