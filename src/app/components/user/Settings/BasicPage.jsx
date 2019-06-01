import React, { Component } from 'react'
import { Segment, Header, Form,Divider, Button } from 'semantic-ui-react';
import moment from 'moment';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import DateInput from '../../../common/form/DateInput';
import PlaceInput from '../../../common/form/PlaceInput';
import RadioInput from '../../../common/form/RadioInput';


class BasicInfoPage extends Component {

    render() {
        const {pristine, submitting} = this.props;
        return (
            <Segment>
                <Header dividing size="large" content="Basic Information"></Header>
                <Form>
                    <Field width={8} name="displayName" component={TextInput} placeholder="Your name" />
                    <Form.Group inline> 
                        <Field name="gender" type="radio" value="male" label="Male" component={RadioInput} />
                        <Field name="gender" type="radio" value="female" label="Female" component={RadioInput} />
                    </Form.Group>
                    <Field 
                        width={8} 
                        name="dataOfBirth" 
                        component={DateInput}
                        placeholder="Your date of birth"
                        dateFormat="YYYY-MM-DD" 
                        showYearDropdown={true} 
                        showMonthDropdown={true}
                        dropdownMode="select" 
                        // maxDate={moment().subtract(18, 'years')}
                    />
                    <Field width={8} name="city" options={{types: ['cities']}} label='Female' component={PlaceInput} placeholder="Your name" />
                    <Divider />
                    <Button disabled={pristine || submitting} positive size="large" content="Update Profile" />
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({ form: 'basicInfo', enableReinitialize: true })(BasicInfoPage);