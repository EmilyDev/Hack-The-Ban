import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import AppBarMenu from './AppBarMenu';
import RaisedButton from 'material-ui/RaisedButton';

let style = {
  button: {
    "margin": "2em auto",
    "display": "block",
    "width": "50%"
  }
};

export default class AdminContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Toolbar style={{backgroundColor: 'black'}}>
          <ToolbarGroup firstChild={true}>
            <IconButton onClick={() => browserHistory.push('/admin/travelers')}>
              <ActionFlightTakeoff />
            </IconButton>
            <ToolbarTitle text="Border Buddy" />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <Link to="/register" >
              <RaisedButton label="Add Traveler" secondary={true} id="add-new-traveler"/>
            </Link>
            <AppBarMenu />
          </ToolbarGroup>
        </Toolbar>
        {this.props.children}
      </div>
    )
  }
}
