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

const IndexDisplayCard = ({headerText, bodyText, footerText}) => {
    return (
        <StyledDisplayCard>
            <div>{headerText}</div>
            <div>{bodyText}</div>
            <div>{footerText}</div>
        </StyledDisplayCard>
    )
}

export default IndexDisplayCard;