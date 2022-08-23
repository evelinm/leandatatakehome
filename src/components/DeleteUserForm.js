import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

function DeleteUserForm({deleteUser, users}){
  const navigate = useNavigate();
  const firstUser = users[0];
  const [form, setForm] = useState({
    user:`${firstUser.firstName} ${firstUser.lastName}`
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    deleteUser(form);
    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="user">User</Label>
        <Input
          type="select"
          name="user"
          id="user"
          value={form.user}
          onChange={handleChange}
        >
          {users.map(user => (
            <option 
              value={`${user.firstName} ${user.lastName}`}
              key={uuid()}
            >
              {`${user.firstName} ${user.lastName}`}
            </option>
          ))}
        </Input>
      </FormGroup>

      <Button>
        Delete User
      </Button>
    </Form>
  )
}

export default DeleteUserForm;