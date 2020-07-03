import axios from 'axios'
import * as Yup from 'yup'

export const required = value => value === null || value === '' ? 'Required' : undefined

export const phone = value =>
  value && !/^\d{10}$/.test(value)
    ? 'Invalid phone, please enter as "5552224444"' : undefined

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address' : undefined

export const uppercase = value => value && value !== value.toUpperCase() ? 'Must be uppercase' : undefined

export const validateCode = values => {
  return axios.get(`/api/flight/code?code=${values.airlineCode}`)
    .then(response => console.log(response.data))
    .catch(() => {
      throw { airlineCode: 'Airline code not found!' }
    })
}

export const minimumLength = value => value.length < 8 ? 'Must be at least 8 characters long' : undefined

export const numbersOnly = value => value && !/^[0-9]+$/i.test(value) ? 'Please only put the country code number only' : undefined

export const phoneRegExp = /^\d{10}$/
// Yup validation for easier validations:
export const yupValidationSchema = isAdmin => Yup.object().shape(
  {
    name: Yup.string()
      .required('Required'),
    nationality: !isAdmin
      ? Yup.string()
        .required('Required')
      : null,
    email: !isAdmin
      ? Yup.string()
        .email('Invalid email address')
        .required('Required')
      : Yup.string()
        .email('Invalid email address'),
    // TODO: countryCode:
    phone: Yup.string()
      .required('Required')
      .matches(phoneRegExp, 'Invalid phone, please enter as 5552224444'),
    connectivity: !isAdmin
      ? Yup.string()
        .required('Required')
      : null
  }
)
