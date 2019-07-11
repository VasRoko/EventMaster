import React, { Component } from 'react'
import { addYears } from 'date-fns';
import {Field, reduxForm} from 'redux-form';
import { Segment, Header, Form, Divider, Button } from 'semantic-ui-react';
import PlaceInput from '../../../common/form/PlaceInput';
import { renderRadio, renderDateInput, renderTextInput } from '../../../common/form/formComponents';


class BasicInfoPage extends Component {
    render() {
        const {pristine, submitting, handleSubmit, updateProfile, loading} = this.props;
        return (
            <Segment>
                <Header dividing size="large" content="Basic Information"></Header>
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field width={8} name="displayName" component={renderTextInput} placeholder="Your name" />   
                    <Form.Group inline >
                        <label>Gender: </label> 
                        <Field name="gender" label="Male" type="radio" component={renderRadio} value="male"/>
                        <Field name="gender" type="radio" label="Female" component={renderRadio} value="female"/>
                    </Form.Group>
                    <Field 
                        width={8} 
                        name="dob" 
                        dateFormat='dd/MM/yyyy'
                        component={renderDateInput}
                        placeholder="Your date of birth"
                        showYearDropdown={true} 
                        showMonthDropdown={true}
                        dropdownMode="select" 
                        maxDate={addYears(new Date(), -18)}
                    />
                    <Field width={8} name="city" options={{types: ['(cities)']}} component={PlaceInput} placeholder="City" />
                    <Divider />
                    <Button loading={loading} disabled={pristine || submitting} positive size="large" content="Update Profile" />
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({ form: 'basicInfo', enableReinitialize: true, destroyOnUnmount: false })(BasicInfoPage);