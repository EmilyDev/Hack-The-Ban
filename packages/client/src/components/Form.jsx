import React from 'react';
import {RenderTextField} from './Field';
import {Field} from 'redux-form';
import {Button, MenuItem, Divider, TextField, DatePicker, Select} from '@material-ui/core';
import {AutoComplete} from 'redux-form-material-ui';
import AirlinePicker from './AirlinePicker';
import {required, phone, email, validateCode, uppercase} from '../utils/validations';
import countryCodes from '../utils/countryCodes';
import { formStyle } from './Admin/styles';

const Form = (props) => (

  <form style={formStyle.form} onSubmit={props.handleSubmit}>
    <h1 style={formStyle.header}>{props.formTitle}</h1>
    <Divider />
    <h3>Personal and Contact Details</h3>
    <p><em>Tell us about yourself, so our lawyers can can best assist you.</em></p>
     <div className="clearfix">
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="name"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          validate={required}
          label="Name"
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field 
          name="nationality"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          validate={!props.isAdmin ? required : undefined}
          label="Nationality"
        />
      </div>
      {/* <div className="field-container col-12 md-col md-col-6">
        <Field
          name="requireInterpreter"
          component={SelectField}
          label="Are you comfortable speaking English?"
        >
          <MenuItem value="false" primaryText="Yes"/>
          <MenuItem value="true" primaryText="No"/>
        </StyledField>
      </div> */}
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="preferredLanguage"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          label="Preferred language(s)"
        />
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="email"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          validate={!props.isAdmin ? [required, email] : email}
          label="Email"
        />
      </div>
      {/* <div className="field-container col-12 md-col md-col-6">
        <Field
          name="countryCode"
          component={AutoComplete}
          label="Country Phone Code"
          validate={required}
          dataSource={Object.values(countryCodes)}
          filter={AutoComplete.caseInsensitiveFilter}
          fullWidth={true}
        />
      </div> */}
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="phone"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          label="Phone Number"
          validate={[required, phone]}
        />
      </div>
      {/* <div className="field-container col-12 md-col md-col-6">
        <Field
          name="connectivity"
          component={SelectField}
          label="Do you have a smartphone?"
          validate={!props.isAdmin ? required : undefined}
        >
          <MenuItem className="traveler-has-phone-option" value="true" primaryText="Yes"/>
          <MenuItem className="traveler-has-no-phone-option" value="false" primaryText="No"/>
        </StyledField>
      </div> */}
    </div>
    <div className="clearfix">
      <h3>Travel details</h3>
      <p><em>Tell us when your flight arrives, so we know when to check in with you.</em></p>
      {/* <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="arrivalTime"
          component={DatePicker}
          validate={!props.isAdmin ? required : undefined}
          label="What day do you arrive?"
          format={null} // eliminates error in Redux Form Material UI
        />
      </div> */}
      {/* <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="airlineCode"
          component={AirlinePicker}
          validate={!props.isAdmin ? [uppercase, required] : uppercase}
          label="Airline code"
        />
      </div> */}
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="flightNum"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          validate={!props.isAdmin ? required : undefined}
          label="Flight number"
        />
      </div>
    </div>
    <div className="clearfix">
      <h3>Emergency contact</h3>
      <p><em>Who can we contact if we can't get in touch with you?</em></p>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="secondaryContactName"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          label="Name"
        />
      </div>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="secondaryContactPhone"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          label="Phone Number"
          validate={[phone]}
        />
      </div>
      <div className="field-container col-12 md-col sm-col-6 md-col-4">
        <Field
          name="secondaryContactRelation"
          component={RenderTextField}
          underlineFocusStyle={formStyle.underline}
          style={formStyle.input}
          label="Relationship to you"
        />
       </div>
    </div>
    {/* {props.children /* renders the AdminExtension part of the form or any other additional fields you may want */ }
    <div> 
      <Button
        type="submit"
        label="Register"
        variant='contained'
        className="submit-traveler-registration"
        disabled={!props.valid}
        color='primary'
        style={formStyle.submitButton}
      />
      {
        props.showAdditionalButtons &&
        <div>
          <Button 
            label="Text Traveler" 
            variant='contained'
            onClick={props.sendText} 
            style={formStyle.adminButton} 
            labelColor="#2d6ea8" 
          />
          <Button 
            label="Delete Traveler" 
            variant='contained'
            onClick={props.deleteTraveler} 
            style={formStyle.adminButton} 
            backgroundColor="#bd1c11" 
            labelColor="#FFFFFF" 
          />
        </div>
      }
    </div>
  </form>
);

export default Form;