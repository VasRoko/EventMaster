import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header, Divider } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import cuid from 'cuid';
import { createEvent, updateEvent } from '../../../actions/eventActions';
import TextInput from '../../../common/form/TextInput';
import TextArea from '../../../common/form/TextArea';
import SelectInput from '../../../common/form/SelectInput';
import DateInput from '../../../common/form/DateInput';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan  } from 'revalidate';
import { __values } from 'tslib';

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
        event: Object.assign({}, this.props.event)
    }

    onFormSubmit = (evtVal) => {
        evtVal.date = moment(evtVal.date).format()
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
    const { invalid, submitting, pristine} = this.props;
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
                        <Divider />
                        <Field name='city' type='text' component={TextInput} placeholder='Event City' />
                        <Field name='venue' type='text' component={TextInput} placeholder='Event Venue' />
                        <Field name='date' 
                            type='text' 
                            component={DateInput} 
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeCaption="time"
                            placeholder='Date and Time of Event' />
                        <Button positive disabled={ invalid || submitting || pristine } type="submit">Submit</Button>
                        <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                    </Form>
                </Segment>
          </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapState, actions)(reduxForm({form: 'eventForm', enableReinitialize: true, validate})(EventForm));