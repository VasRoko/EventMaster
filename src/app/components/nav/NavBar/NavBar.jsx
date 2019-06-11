import React, { Component } from 'react';
import { withFirebase } from 'react-redux-firebase';
import {connect}  from 'react-redux';
import AuthMenu from '../Menus/AuthMenu';
import UnAuthMenu from '../Menus/UnAuthMenu';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../../actions/modalActions';

const actions = {
    openModal,
}

const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
})


class NavBar extends Component {

    handleSignIn = () => {
        this.props.openModal('LoginModal');
    }

    handleRegister = () => {
        this.props.openModal('RegisterModal');
    }

    handleSignOut = () => {
        this.props.firebase.logout();
        this.props.history.push('/');
    }

    render() {
        const { fixed, auth, profile } = this.props;
        const authenticated = auth.isLoaded && !auth.isEmpty;
        return (
            <div>        
                { authenticated ?  <AuthMenu auth={auth} profile={profile} singOut={this.handleSignOut} />  :  <UnAuthMenu singIn={this.handleSignIn} register={this.handleRegister} fixed={fixed} /> }
            </div>
        )
    }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));