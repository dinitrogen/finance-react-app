import React from "react";
import DisplayCard from "./DisplayCard";


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

            <button onClick={handleClick}>Clear history</button>

        </div>
    )
}

export default HistoryPage;