import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Button, MenuItem } from '@material-uicore'
import { TextField, DatePicker, SelectField } from 'redux-form-material-ui'
import AirlinePicker from '../AirlinePicker'
import CountryCodePicker from '../CountryCodePicker'
import { fetchSelectedTraveler } from '../../actions/selectedTraveler'
import { required, phone, email, uppercase } from '../../utils/validations'
import countryCodes from '../../utils/countryCodes'
import AdminAddTravelerForm from './AdminAddTravelerForm'

class SingleTraveler extends React.Component {
  componentDidMount () {
    this.props.fetchSelectedTraveler(this.props.id)
  }

  render () {
    return (
      <AdminAddTravelerForm
        {...this.props}
        title={'Edit Traveler'}
        showAdditionalButtons={true}
      />
    )
  }
}

const mapStateToProps = ({ selectedTraveler }) => {
  const {
    name,
    nationality,
    requireInterpreter,
    preferredLanguage,
    email,
    phone,
    connectivity,
    secondaryContactPhone,
    secondaryContactName,
    secondaryContactRelation,
    status: passengerStatus,
    representative,
    countryCode
  } = selectedTraveler
  const { airlineCode, flightNum, scheduledArrivalTime, status: flightStatus } =
    selectedTraveler.flight || {}
  const flightDate = scheduledArrivalTime ? new Date(scheduledArrivalTime) : null
  return {
    initialValues: {
      name,
      nationality,
      requireInterpreter: String(requireInterpreter),
      preferredLanguage,
      email,
      phone,
      connectivity: String(connectivity),
      secondaryContactPhone,
      secondaryContactName,
      secondaryContactRelation,
      passengerStatus,
      scheduledArrivalTime: flightDate,
      airlineCode,
      flightNum,
      flightStatus,
      representative,
      contryCoe: countryCodes[countryCode]
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectedTraveler: (id) => dispatch(fetchSelectedTraveler(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTraveler)
