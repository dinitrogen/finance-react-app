import React from "react";
import StockChart from "./StockChart";
import { StyledRotateDiv, StyledButton } from "./StyledComponents";
import styled from "styled-components";
import loadingIcon from '../images/loading.png';

const StyledDisplayCard = styled.div`
    margin: 1em;
    width: 15em;
    padding: 10px;
    border: solid palevioletred 3px;
    border-radius: 10px;
    background-color: white;
    color: black;
    font-weight: bold;
    
`;

const StyledBodyText = styled.div`
    color: ${props => props.positive ? "green" : "red"};
`;

const DisplayCard = ({headerText, bodyText, footerText, loading, buttonText, handleClick, handleDisabled, handlePrimary, showButton, chartData, isPositive, handleDrag, handleDrop,id}) => {
    
    if (loading) {
        return (
            <StyledRotateDiv>
                <img alt="loading" src={loadingIcon} width="25"></img>
            </StyledRotateDiv>
        )
    } 

    return (
        <StyledDisplayCard
            id={id}
            draggable={true}
            onDragOver={(ev) => ev.preventDefault()}
            onDragStart={handleDrag}
            onDrop={handleDrop} >
            {chartData &&
            <StockChart
                chartData={chartData}
            />
            }
            <div>{headerText}</div>
            <StyledBodyText positive={isPositive}>{bodyText}</StyledBodyText>
            <div>{footerText}</div>
            
            {showButton &&
            <StyledButton 
                primary={handlePrimary}
                disabled={handleDisabled}
                onClick={handleClick}>
                    {buttonText}
            </StyledButton>}
            
        </StyledDisplayCard>
    );
}

export default DisplayCard;