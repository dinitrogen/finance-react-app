import React from "react";
import DisplayCard from "./DisplayCard";
import { StyledButton } from "./StyledComponents";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";


const HistoryPage = ({tickers, handleClick}) => {

    return(
        <div>
            <h3>Session History</h3>
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