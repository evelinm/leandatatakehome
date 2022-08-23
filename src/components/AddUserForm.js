import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import errorStyle from "../helpers/errorStyle";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

function AddUserForm({addUser}){
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);

  const handleChange = evt => {
    const newValueIsValid = !evt.target.validity.patternMismatch;
    if (error) {
      if (newValueIsValid) {
        setError(false);
        setShowErrorText(false);
      }
    }
    const { name, value } = evt.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    addUser(form);
    navigate("/");
  }

  const handleBlur = evt => {
    if (!error) {
      if (evt.target.validity.patternMismatch) {
        setError(true);
        setShowErrorText(true);
      }
    }
    if (error) {
      setShowErrorText(false);
    }
  };

  return (
    <Form className="w-80 flex grid items-center justify-items-center place-content-center" onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          name="firstName"
          id="firstName"
          onBlur={handleBlur}
          pattern="([A-z])\w+"
          style={errorStyle(error)}
          value={form.firstName}
          onChange={handleChange}
        />
        {showErrorText && (
          <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
            Please only use letters no special characters
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <Label for="lastName"> Last Name </Label>
        <Input
          name="lastName"
          id="lastName"
          onBlur={handleBlur}
          pattern="([A-z])\w+"
          style={errorStyle(error)}
          value={form.lastName}
          onChange={handleChange}
        />
        {showErrorText && (
          <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
          Please only use letters no special characters
          </p>
        )}
      </FormGroup>

      <Button className="p-2 ">
        Add User
      </Button>
    </Form>
  )
}

export default AddUserForm;