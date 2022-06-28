import React from "react";
import "./DisplayCard.css";

const DisplayCard = ({headerText, bodyText, footerText}) => {
    return (
        <div className="displayCardDiv">
            <div>{headerText}</div>
            <div>{bodyText}</div>
            <div>{footerText}</div>

        </div>
    );
}

export default DisplayCard;