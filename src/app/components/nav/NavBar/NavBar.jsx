import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
        <Menu segment={ true ? 1 : 0} fixed="top" className="masthead">
            <Container>
                <Menu.Item as={Link} to='/'>
                    <img src="assets/img/logo.png" className="logo" alt="logo"></img>
                    <span>Master Events</span>
                </Menu.Item>
                
                <Menu.Item as={NavLink} to='/events' name="Events"/>
                <Menu.Item as={NavLink} to='/people' name="People"/>
                <Menu.Item>
                    <Button as={Link} to='/createEvent' positive content="Create Event" />
                </Menu.Item> 
                <Menu.Item position="right" className="auth_buttons">
                    <Button basic positive content="Sign Out" />
                </Menu.Item>
            </Container>
        </Menu>
    )
  }
}

export default NavBar;