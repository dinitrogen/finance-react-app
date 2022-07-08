import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledButton } from './StyledComponents';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import logoIcon from "../images/increase.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiX } from "react-icons/bi"


const Navbar = styled.nav`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    font-size: 1em;
    height: 80px;
    background-color: rgba(60, 100, 60, 1);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    

`;

const MenuIcon = styled.div`
    display: none;

    @media screen and (max-width:1000px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-50%, 40%);
        font-size: 2.5rem;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
    }

`;

const NavLogo = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    position: absolute;
    left: 30px;

`;

const Menu = styled.ul`
    display: flex;
    align-items: center;
    text-align: center;

    @media only screen and (max-width:1000px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 80px;
        left: ${({menuBarClicked}) => menuBarClicked ? '0' : '-100%'};
        background-color: rgba(0, 0, 0, 0.9);
        transition: all 0.5s ease;
        padding: 0;
        margin: 0;
    }

`;

const MenuItem = styled.li`
    display:flex;
    list-style: none;
    height: 80px;
    align-items: center;

    @media only screen and (max-width:1000px) {
        display: block;
        width:100%;
    }
`;

const MenuText = styled.div`
    display: flex;
    font-size: 1rem;
    color: rgba(255, 255, 255, 1);
    align-items: center;
    justify-content: center;
    height:100%;
    padding: 0 1rem;
    
`;



const MenuLink = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 100%;
    transition: all 0.2s ease;

    &:active {
        color: rgba(50, 220, 150, 1)
    }

    &:hover {
        color: rgba(50, 220, 150, 1)
    }

    @media only screen and (max-width: 1000px) {
        display: block;
        padding: 3rem;
        text-align: center;
        transition: all 0.2s ease;
    }
`;

const LogoutButton = styled(StyledButton)`
    margin: 1rem;
    background-color: rgba(50, 220, 150, 1);
    border-color: rgba(50, 220, 150, 1);
    cursor: pointer; 
`;

const LandingPage = ({userName, isLoggedIn}) => {
    
    const [menuBarClicked, setMenuBarClicked] = useState(false);
    
    const logout = async () => {
        await signOut(auth);
    }
    
    const handleClick = () => {
        setMenuBarClicked(!menuBarClicked);
    }

    return (
        <Navbar>
            <NavLogo to ="/finance-react-app">
                
                <h2>StockFinder</h2>
                <img alt="logo"src={logoIcon} width="50" hspace="10"></img>
                
            </NavLogo>

            <MenuIcon onClick={handleClick}>
                {menuBarClicked ? <BiX/> : <GiHamburgerMenu/>}
            </MenuIcon>
            <Menu onClick={handleClick} menuBarClicked={menuBarClicked}>
            
                <MenuItem>
                    <MenuLink  to="/history">History</MenuLink>
                </MenuItem>
                <MenuItem>
                    <MenuLink  to="/favorites">Favorites</MenuLink>
                </MenuItem>
            

                <MenuItem>
                    <MenuText>Welcome, {userName}</MenuText>
                
                    {isLoggedIn &&
                        
                                <LogoutButton
                                primary={true}
                                onClick={logout}
                                disabled={false}>
                                    Log out
                            </LogoutButton>            
                    }
                </MenuItem>
                
            </Menu>

        </Navbar>
    )
}

export default LandingPage;