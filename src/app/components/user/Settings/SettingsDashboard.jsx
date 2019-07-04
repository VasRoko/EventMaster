import React from 'react';
import { connect } from 'react-redux';
import { Grid, Container } from 'semantic-ui-react';
import SettingsNav from './SettingsNav';
import {Switch, Route, Redirect } from 'react-router-dom';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import { updateEmail, updatePassword } from "../../../actions/authActions";
import { updateProfile } from "../../../actions/userActions";

const actions = {
    updateEmail,
    updatePassword,
    updateProfile
}

const mapState = (state) => ({
    providerId: state.firebase.auth.providerData[0].providerId,
    user: state.firebase.profile,
    account: state.firebase.auth
})
const SettingsDashboard = ({ updateEmail, updatePassword, providerId, account, user, updateProfile }) => {
    return (
        <Container>
            <Grid>
                <Grid.Column width={4}>
                    <SettingsNav/> 
                </Grid.Column>
                <Grid.Column width={12}>
                    <Switch>
                        <Redirect exact from='/settings' to='/settings/basic' />
                        <Route path='/settings/basic' render={() => <BasicPage initialValues={user} updateProfile={updateProfile} />}/>
                        <Route path='/settings/about' render={() => <AboutPage initialValues={user} updateProfile={updateProfile} /> }/>
                        <Route path='/settings/photos' component={PhotosPage}/>
                        <Route path='/settings/account' render={() => <AccountPage updatePassword={updatePassword} updateEmail={updateEmail} account={account} providerId={providerId} />}/>
                    </Switch>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default  connect(mapState, actions)(SettingsDashboard);