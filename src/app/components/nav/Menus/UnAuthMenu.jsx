import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const UnAuthMenu = ({singIn, fixed, homaPage}) => {
    return (
        <Menu segment={ true ? 1 : 0} fixed="top" className="masthead">
            <Container>
                <Menu.Item as={Link} to='/'>
                    <img src="/assets/img/logo.png" className="logo" alt="logo"></img>
                    <span>Master Events</span>
                </Menu.Item>
                <Menu.Item position="right" className="auth_buttons">
                    <Button basic positive onClick={singIn} content="Sign In" />
                    <Button basic positive content="Sign Up" />
                </Menu.Item>
            </Container>
        </Menu>
    )   
}

export default UnAuthMenu;