import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';

class NavBar extends Component {
  render() {
    return (
        <Menu segment={ true ? 1 : 0} fixed="top" className="masthead">
            <Container>
                <Menu.Item header>
                    <img src="assets/img/logo.png" className="logo" alt="logo"></img>
                    Master Events
                </Menu.Item>
                
                <Menu.Item name="Events"/>
                {/* <Menu.Item>
                    <Button positive content="Create Event" />
                </Menu.Item> */}
                <Menu.Item position="right" className="auth_buttons">
                    <Button basic positive content="Login" />
                    <Button basic positive content="Sign Out" />
                </Menu.Item>
            </Container>
        </Menu>
    )
  }
}

export default NavBar;