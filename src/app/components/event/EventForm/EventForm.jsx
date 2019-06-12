/*global google*/

import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header, Divider } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { createEvent, updateEvent } from '../../../actions/eventActions';
import { renderDateInput, renderTextInput, renderSelectInput, renderTextArea  } from '../../../common/form/formComponents';
import PlaceInput from '../../../common/form/PlaceInput';

import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan  } from 'revalidate';
import { errorNotification, successNotification } from '../../../common/notifications/notification';

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {}

    if (eventId && state.events.length > 0) {
        event = state.events.find(event => event.id === eventId);
    } 

    return {
        initialValues: event
    }
}

const actions = {
    createEvent,
    updateEvent
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
        vanueLatLng: {},
        scriptLoaded: false
    }

    handleCitySelect = (selectedCity) => {
        geocodeByAddress(selectedCity)
        .then(results => getLatLng(results[0]))
        .then(latlng => {
            this.setState({
                cityLatLng: latlng
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

    onFormSubmit = async (vales) => {
        vales.venueLatLng = this.state.venueLatLng;
        try {
            if (this.props.initialValues.id){
                this.props.updateEvent(vales);
                this.props.history.goBack();
            } else {
                let createdEvent = await this.props.createEvent(vales);
                this.props.history.push(`/events/${createdEvent.id}`);
            }
            successNotification('Success!', 'You have created a new event!');
        } catch(e) {
            console.log(e);
            errorNotification();
        }
    }

    handleCancel = () => {
        this.props.history.push('/events');
    }

  render() {
    const { invalid, submitting, pristine} = this.props;
    return (
        <div>
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
                        <Button positive disabled={ invalid || submitting || pristine } type="submit">Submit</Button>
                        <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
        </div>
    )
  }
}

export default connect(mapState, actions)(reduxForm({form: 'eventForm', enableReinitialize: true, validate})(EventForm));