import { React } from 'react';
import styled from 'styled-components';
import { BsGithub } from "react-icons/bs";

const StyledFooter = styled.footer`
    position: fixed;
    left:0;
    bottom: 0;
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    background-color: rgba(60, 100, 60, 1);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
    color: white;
`;

const StyledIconLink = styled.a`
    :visited {
        color:white;
    }
`;

const FooterList = styled.ul`
    padding:0;
    margin:0;
    display:flex;
    align-items: center;
    height:100%;
`;

const FooterItem = styled.li`
    list-style: none;
    padding-left: 1rem;
    padding-right:1rem;
    font-size: 1rem;
    
`;

const FooterIcon = styled.li`
    list-style: none;
    padding-left: 1rem;
    padding-right:1rem;
    font-size: 2rem;
    padding-top: 0.5rem;
`;

const Footer = () => {

    return(
        <StyledFooter>
            <FooterList>
                <FooterItem>
                    <div>&copy; 2024 dinitrogen</div>
                </FooterItem>
                <FooterIcon>
                    <StyledIconLink href="https://github.com/dinitrogen/finance-react-app"><BsGithub /></StyledIconLink>
                </FooterIcon>


            </FooterList>


        </StyledFooter>
    )
}

export default Footer;