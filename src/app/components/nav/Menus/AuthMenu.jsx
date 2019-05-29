import React from 'react'
import { Button, Container, Menu, Dropdown, Image } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom';

const AuthMenu = ({singOut, auth}) => {
  return (
    <Menu segment={ true ? 1 : 0} fixed="top" className="masthead">
        <Container>
            <Menu.Item as={Link} to='/'>
                <img src="/assets/img/logo.png" className="logo" alt="logo"></img>
                <span>Master Events</span>
            </Menu.Item>
            <Menu.Item as={NavLink} to='/events' name="Events"/>
            <Menu.Item as={NavLink} to='/people' name="People"/>
            <Menu.Item>
                <Button as={Link} to='/createEvent' positive content="Create Event" />
            </Menu.Item> 
            <Menu.Item position="right">
                <Image avatar spaced="right" src="/assets/img/user.png" />
                <Dropdown pointing="top left" text={auth.email}>
                    <Dropdown.Menu>
                        <Dropdown.Item text="Create Event" icon="plus"></Dropdown.Item>
                        <Dropdown.Item text="My Events" icon="calendar"></Dropdown.Item>
                        <Dropdown.Item text="My Network" icon="users"></Dropdown.Item>
                        <Dropdown.Item text="My Profile" icon="user"></Dropdown.Item>
                        <Dropdown.Item as={ Link } to='/settings' text="Settings" icon="settings"></Dropdown.Item>
                        <Dropdown.Item onClick={singOut} text="Sign out" icon="power"></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Container>
    </Menu>
  )
}

export default AuthMenu;
