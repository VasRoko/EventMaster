import React, { Component } from 'react'
import AuthMenu from '../Menus/AuthMenu';
import UnAuthMenu from '../Menus/UnAuthMenu';
import { withRouter } from 'react-router-dom';
class NavBar extends Component {
    state = {
        authenticated: false
    }

    handleSignIn = () => {
        this.setState({
            authenticated: true
        });
        this.props.history.push('/events');

    }

    handleSignOut = () => {
        this.setState({
            authenticated: false
        });
        this.props.history.push('/');
    }

    render() {
        const { authenticated } = this.state;
        const { fixed } = this.props;
        return (
            <div>        
                {authenticated ? ( <AuthMenu singOut={this.handleSignOut} /> ) : ( <UnAuthMenu singIn={this.handleSignIn} fixed={fixed} /> ) }
            </div>
        )
    }
}

export default withRouter(NavBar);