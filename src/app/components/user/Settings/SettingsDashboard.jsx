import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import SettingsNav from './SettingsNav';
import {Switch, Route, Redirect } from 'react-router-dom';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import { updatePassword } from "../../../actions/authActions";
import { updateProfile } from "../../../actions/userActions";

const actions = {
    updatePassword,
    updateProfile
}

const mapState = (state) => ({
    providerId: state.firebase.auth.providerData[0].providerId,
    user: state.firebase.profile
})
const SettingsDashboard = ({ updatePassword, providerId, user, updateProfile }) => (
    <Grid>
        <Grid.Column width={4}>
            <SettingsNav/> 
        </Grid.Column>
        <Grid.Column width={12}>
            <Switch>
                <Redirect exact from='/settings' to='/settings/basic' />
                <Route path='/settings/basic' render={() => <BasicPage initialValues={user} updateProfile={updateProfile} />}/>
                <Route path='/settings/about' component={AboutPage}/>
                <Route path='/settings/photos' component={PhotosPage}/>
                <Route path='/settings/account' render={() => <AccountPage updatePassword={updatePassword} providerId={providerId} />}/>
            </Switch>
        </Grid.Column>

    </Grid>
);

export default  connect(mapState, actions)(SettingsDashboard);