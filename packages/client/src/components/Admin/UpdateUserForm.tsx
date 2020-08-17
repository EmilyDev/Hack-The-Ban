import React from 'react'
import {Button, Card} from '@material-ui/core'
import { adminSignUp } from './styles'
import { phoneRegExp } from '../../utils/validations'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'

export const UpdateUserForm = ({
  handleSubmit,
  pristine,
  submitting,
}: any) => {
  const style = adminSignUp
  return (
    <Formik
      initialValues={{
        email: '',
        oldPassword: '',
        newPassword: '',
        phone: '',
      }}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validationSchema={
        Yup.object().shape(
          {
            email: Yup.string()
              .email()
              .required(),
            oldPassword: Yup.string()
              .required(),
            newPassword: Yup.string(),
            phone: Yup.string()
              .required()
              .matches(phoneRegExp, 'Invalid phone, please enter as 5552224444'),
          })}
    >
      <Card style={style.card}>
        <div>
          <h3 style={style.title}>Update Profile</h3>
          <Form>
            <Field
              name="email"
              label="Email"
              component={TextField}
              type='email'
              style={style.input}
            />
            <Field
              name="oldPassword"
              label='Old Password'
              type='password'
              component={TextField}
              style={style.input}
            />
            {/* <Typography md={12} variant='caption'>Provide your old password to make a new password</Typography> */}
            <Field
              name="newPassword"
              label="New Password"
              component={TextField}
              type="password"
              style={style.input}
            />
            {/* <Typography md={12} variant='caption'>Minimum 8 characters</Typography> */}
            <Field
              name="phone"
              label="Phone Number"
              component={TextField}
              style={style.input}
            />
            <Button
              type="submit"
              disabled={pristine || submitting}
              variant='contained'
              color='primary'
              style={style.button}
            >
              Save
            </Button>
          </Form>
        </div>
      </Card>
    </Formik>
  )
}