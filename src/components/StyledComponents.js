import styled from "styled-components";
import { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const StyledDisplayCard = styled.div`
    margin: 20px;
    width: 20em;
    padding: 10px;
    border: solid black 3px;
    border-radius: 10px;
    background-color: dodgerblue;
    color: white;
`;

const StyledRotateDiv = styled.div`
    display: inline-block;
    animation: ${rotate} 0.5s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
`;

const StyledButton = styled.button`
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;

const StyledInput = styled.input`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    margin: 1em;
    padding: 1em;
`;

export {StyledButton, StyledInput, StyledRotateDiv, StyledDisplayCard};