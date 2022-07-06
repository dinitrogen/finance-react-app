import { React } from 'react';
import styled from 'styled-components';

const StyledDisplayCard = styled.div`
    margin: 1em;
    width: 15em;
    padding: 10px;
    /* border: solid palevioletred 3px; */
    /* border-radius: 10px; */
    background-color: white;
    color: black;
    font-weight: bold;
    
`;

const StyledBodyText = styled.div`
    color: ${props => props.positive ? "green" : "red"};
`;

const IndexDisplayCard = ({headerText, bodyText, footerText, isPositive}) => {
    return (
        <StyledDisplayCard>
            <div>{headerText}</div>
            <StyledBodyText positive={isPositive}>{bodyText}</StyledBodyText>
            <div>{footerText}</div>
        </StyledDisplayCard>
    )
}

export default IndexDisplayCard;