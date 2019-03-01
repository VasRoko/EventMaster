import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from '../../../actions/eventActions';
import TextInput from '../../../common/form/TextInput';
import cuid from 'cuid';
import TextArea from '../../../common/form/TextArea';
import SelectInput from '../../../common/form/SelectInput';

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

class EventForm extends Component {
 
    state = {
        event: Object.assign({}, this.props.event)
    }

    onFormSubmit = (evtVal) => {
        if(this.props.initialValues.id){
            this.props.updateEvent(evtVal);
            this.props.history.goBack();
        } else {
            const newEvent = {
                ...evtVal,
                id: cuid(),
                hostPhotoURL: '/assets/img/user.png'
            } 
            this.props.createEvent(newEvent);
            this.props.history.push('/events');
        }
    }
    
    handleCancel = () => {
        this.props.history.push('/events');
    }

  render() {
    return (
      <Grid>
          <Grid.Column width={10}>
                <Segment>
                    <Header sub color='teal' content='Event Details' /> 
                    <br />
                    <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                        <Field name='title' type='text' component={TextInput} placeholder='Event Title' />
                        <Field name='category' type='text' options={category} component={SelectInput} placeholder='Event Category' />
                        <Field name='description' type='text' rows={4} component={TextArea} placeholder='Event Description' />
                        <Header sub color='teal' content='Event Location Details' /> 
                        <br />
                        <Field name='city' type='text' component={TextInput} placeholder='Event City' />
                        <Field name='venue' type='text' component={TextInput} placeholder='Event Venue' />
                        <Field name='date' type='text' component={TextInput} placeholder='Event Date' />
                        <Button positive type="submit">Submit</Button>
                        <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                    </Form>
                </Segment>
          </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapState, actions)(reduxForm({form: 'eventForm', enableReinitialize: true})(EventForm));