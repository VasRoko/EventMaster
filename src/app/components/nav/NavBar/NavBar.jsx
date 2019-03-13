import React, { Component } from 'react';
import {connect}  from 'react-redux';
import AuthMenu from '../Menus/AuthMenu';
import UnAuthMenu from '../Menus/UnAuthMenu';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../../actions/modalActions';
import { logout } from '../../../actions/authActions';

const actions = {
    openModal,
    logout
}

const mapState = (state) => ({
    auth: state.auth
})


class NavBar extends Component {

    handleSignIn = () => {
        this.props.openModal('LoginModal');
    }

    handleRegister = () => {
        this.props.openModal('RegisterModal');
    }

    handleSignOut = () => {
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        const { fixed, auth } = this.props;
        const authenticated = auth.authenticated;
        return (
            <div>        
                {authenticated ? ( <AuthMenu currentuser={auth.currentUser} singOut={this.handleSignOut} /> ) : ( <UnAuthMenu singIn={this.handleSignIn} register={this.handleRegister} fixed={fixed} /> ) }
            </div>
        )
    }
}

export default withRouter(connect(mapState, actions)(NavBar));