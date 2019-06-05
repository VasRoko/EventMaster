import React from 'react';
import { Segment, Header, Form, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from "redux-form";
import { renderRadio, renderSelectInput, renderTextArea, renderTextInput } from '../../../common/form/formComponents';
import PlaceInput from '../../../common/form/PlaceInput';

const categories = [
    {key: 'technology', text: 'Technology', value: 'technology'},  
    {key: 'history', text: 'History', value: 'history'},  
    {key: 'books', text: 'Books', value: 'books'},  
    {key: 'film', text: 'Film', value: 'film'},  
    {key: 'music', text: 'Music', value: 'music'},  
    {key: 'travel', text: 'Travel', value: 'travel'},  
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {

    return (
        <Segment>
            <Header dividing size="large" content="About Me" />
            <p>Complete your profile to get the most out of this site</p>
            <Form onSubmit={handleSubmit(updateProfile)}>
                <Form.Group inline>
                    <label>Tell us your status: </label>
                    <Field name="status" type="radio" label="Single"  component={renderRadio} value="single"/>
                    <Field name="status" type="radio" label="Married"  component={renderRadio} value="married"/>
                </Form.Group>
                <Divider/>
                <Field name="about" component={renderTextArea}  placeholder="About me" />
                <Field name="interests" component={renderSelectInput} options={categories} multiple={true} value="interests" placeholder="Select your interests"  />
                <Field name="occupation" type="text" component={renderTextInput}  placeholder="Occupation" />
                <Field name="origin" type="text" options={{ types: ['(regions)']}} component={PlaceInput}  placeholder="Country of Origin" />
                <Divider/>
                <Button disabled={pristine || submitting} size="large" positive content="Update Profile" />
            </Form>
        </Segment>
    )
}

export default reduxForm({ form: 'basicInfo', enableReinitialize: true, destroyOnUnmount: false })(AboutPage);