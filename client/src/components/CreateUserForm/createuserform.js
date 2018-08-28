import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import {Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap'

const CreateUserForm = props => (
  
  <form>
  <label htmlFor="username">Enter username</label>
  <input id="username" name="username" type="text" />

  <label htmlFor="email">Enter your email</label>
  <input id="email" name="email" type="email" />

  <label htmlFor="birthdate">Enter your birth date</label>
  <input id="birthdate" name="birthdate" type="password" />

  <button onClick = {props.handleSubmit}>Send data!</button>
</form>

    

);

export default CreateUserForm;