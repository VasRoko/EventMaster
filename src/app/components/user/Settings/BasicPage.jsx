import React, { Component } from 'react'
import { Segment, Header, Form, Divider, Button } from 'semantic-ui-react';
import moment from 'moment';
import {Field, reduxForm} from 'redux-form';
import { renderRadio, renderDateInput, renderTextInput } from '../../../common/form/formComponents';
import PlaceInput from '../../../common/form/PlaceInput';


class BasicInfoPage extends Component {
    render() {
        const {pristine, submitting} = this.props;
        return (
            <Segment>
                <Header dividing size="large" content="Basic Information"></Header>
                <Form>
                    <Field width={8} name="displayName" component={renderTextInput} placeholder="Your name" />   
                    <Form.Group inline >
                        <label>Gender: </label> 
                        <Field name="gender"  value="male" label="Male" component={renderRadio} />
                        <Field name="gender"  value="female" label="Female" component={renderRadio} />
                    </Form.Group>
                    <Field 
                        width={8} 
                        name="dateOfBirth" 
                        component={renderDateInput}
                        placeholder="Your date of birth"
                        dateFormat="dd/MM/YYYY" 
                        showYearDropdown={true} 
                        showMonthDropdown={true}
                        dropdownMode="select" 
                        // maxDate={addDays(new Date(), 5)}
                    />
                    <Field width={8} name="city" options={{types: ['cities']}} component={PlaceInput} placeholder="City" />
                    <Divider />
                    <Button disabled={pristine || submitting} positive size="large" content="Update Profile" />
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({ form: 'basicInfo', enableReinitialize: true })(BasicInfoPage);