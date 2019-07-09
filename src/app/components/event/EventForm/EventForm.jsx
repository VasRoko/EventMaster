/*global google*/

import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header, Divider } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { createEvent, updateEvent, eventCancel } from '../../../actions/eventActions';
import { renderDateInput, renderTextInput, renderSelectInput, renderTextArea  } from '../../../common/form/formComponents';
import PlaceInput from '../../../common/form/PlaceInput';

import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan  } from 'revalidate';
import { errorNotification } from '../../../common/notifications/notification';
import { withFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {}

    if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
        event = state.firestore.ordered.events.filter(event => event.id === eventId)[0] || {};
    }

    return {
        initialValues: event,
        loading: state.async.loading,
        event
    }
}

const actions = {
    createEvent,
    updateEvent,
    eventCancel
}

const category = [
    {key: 'technology', text: 'Technology', value: 'technology'},  
    {key: 'history', text: 'History', value: 'history'},  
    {key: 'books', text: 'Books', value: 'books'},  
    {key: 'film', text: 'Film', value: 'film'},  
    {key: 'music', text: 'Music', value: 'music'},  
    {key: 'travel', text: 'Travel', value: 'travel'},  
];

const validate = combineValidators({
    title: isRequired({message: 'Event title is required'}),
    category: isRequired({message: 'Please provide a category'}),
    description: composeValidators(
        isRequired({message: 'Please enter a description'}),
        hasLengthGreaterThan(5)({message: 'Description need to be at least 5 charaters'})
    )(),
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired('date')
})

class EventForm extends Component {

    state = {
        event: Object.assign({}, this.props.event),
        cityLatLng: {},
        venueLatLng: {},
        scriptLoaded: false
    }

    async componentDidMount() {
        const {firestore, match  }  = this.props;
        await firestore.setListener(`events/${match.params.id}`);
    }

    async componentWillUnmount() {
        const {firestore, match  }  = this.props;
        await firestore.unsetListener(`events/${match.params.id}`);
    }

    handleCitySelect = (selectedCity) => {
        geocodeByAddress(selectedCity)
        .then(results => getLatLng(results[0]))
        .then(latlng => {
            this.setState({
                cityLatLng: latlng,
            })
        })
        .then(() => {
            this.props.change('city', selectedCity)
        })
    }

    handleVenueSelect = (selectedVenue) => {
        geocodeByAddress(selectedVenue)
        .then(results => getLatLng(results[0]))
        .then(latlng => {
            this.setState({
                venueLatLng: latlng
            })
        })
        .then(() => {
            this.props.change('venue', selectedVenue)
        })
    }

    onFormSubmit = async (values) => {
        try {
            values.venueLatLng = this.state.venueLatLng;

            if (this.props.initialValues.id){
                if (Object.keys(values.venueLatLng).length === 0) {
                    values.venueLatLng = this.props.event.venueLatLng;
                }
                await this.props.updateEvent(values);
                this.props.history.push('/events/');
            } else {
                await this.props.createEvent(values);
                this.props.history.push('/events/');
            }
        } catch(e) {
            console.log(e.message);
            errorNotification();
        }
    }

    handleCancel = () => {
        this.props.history.push('/events/');
    }

    handleCancelEvent = async (cancelled, eventId) => {
        const message = cancelled ? "Are you sure you want to cancel this event?" :
        "This will reactivate the event, are you sure?";
        toastr.confirm(message, {
            onOk: async () => await this.props.eventCancel(cancelled, eventId)
        })
    }

    render() {
        const { invalid, submitting, pristine, event, loading } = this.props;
        
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color='teal' content='Event Details' /> 
                        <br />
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                            <Field name='title' type='text' component={renderTextInput} placeholder='Event Title' />
                            <Field name='category' type='text' options={category} component={renderSelectInput} placeholder='Event Category' />
                            <Field name='description' type='text' rows={4} component={renderTextArea} placeholder='Event Description' />
                            <Header sub color='teal' content='Event Location Details' /> 
                            <Divider />
                                <Field 
                                name='city' type='text' 
                                component={PlaceInput} 
                                onSelect={this.handleCitySelect} 
                                options={{type: ['(cities)']}} 
                                placeholder='Event City' />
                                <Field 
                                    name='venue' 
                                    type='text' 
                                    component={PlaceInput} 
                                    options={{
                                        location: new google.maps.LatLng(this.state.cityLatLng),
                                        radius: 1000,
                                        type: ['establishment']
                                    }} 
                                    onSelect={this.handleVenueSelect}
                                    placeholder='Event Venue' />
                                <Field 
                                    name='date'
                                    component={renderDateInput}
                                    dateFormat='dd LLL yyyy h:mm a'
                                    placeholder='Date and Time of Event'
                                    showTimeSelect
                                    timeFormat='HH:mm'                           
                                />
                            <Button positive loading={loading} disabled={ invalid || submitting || pristine } type="submit">Submit</Button>
                            <Button type="button" onClick={this.handleCancel} disabled={loading}>Cancel</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment style={{ position: 'relative' }}>
                        <Button 
                            type="button" 
                            color={event.cancelled ? 'green' : 'red'} 
                            onClick={() => this.handleCancelEvent(!event.cancelled, event.id)}>{ event.cancelled ? 'Reactivate' : 'Cancel' } Event</Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default withFirestore(
    connect(mapState, actions)(reduxForm({form: 'eventForm', enableReinitialize: true, validate})(EventForm))
);