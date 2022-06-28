import React from "react";
import "./DisplayCard.css";
import { StyledRotateDiv } from "./StyledComponents";

const DisplayCard = ({headerText, bodyText, footerText, loading}) => {
    
    if (loading) {
        return (
            <StyledRotateDiv>Loading</StyledRotateDiv>
        )
    } 

    return (
        <div className="displayCardDiv">
            <div>{headerText}</div>
            <div>{bodyText}</div>
            <div>{footerText}</div>
            
        </div>
    );
}

export default DisplayCard;