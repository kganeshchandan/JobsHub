import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
  UncontrolledCollapse,
  Alert,
} from "reactstrap";
import "../App.css";
import axios from "axios";
import logo from "../../src/logo.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

const RegisterForm = () => {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [aproflie, setAprofile] = useState(false);
  const [rprofile, setRprofile] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  async function onSubmit(data) {
    console.log("Data submitted: ", data);
    await axios
      .post("http://localhost:5000/userlist/register", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setSuccess(response.data);
        // setTimeout(() => setSuccess(false), 3000);
        console.log("bruh");
        // history.push("/login");
      })
      .catch(function (error) {
        console.log(error);
        setFailure(error.response.data);
        setTimeout(() => setFailure(false), 3000);

        console.log(error);
      });
  }
  async function onsubmit2(data) {
    console.log(data);
  }
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
    history.push("/login");
  }

  return (
    <div className="loginform">
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormGroup>
          <Label htmlFor="inputEmail">E-mail</Label>
          <Input
            invalid={errors.email}
            type="email"
            id="inputEmail"
            name="email"
            innerRef={register({
              required: "Enter your e-mail",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a valid e-mail address",
              },
            })}
          />
          <FormFeedback>{errors.email && errors.email.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input
            type="select"
            name="jobtype"
            id="exampleSelect"
            innerRef={register({ required: true })}
          >
            <option value="recruiter">recruiter</option>
            <option value="applicant">applicant</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="inputPassword">Password</Label>
          <Input
            invalid={errors.password}
            type="password"
            id="inputPassword"
            name="password"
            innerRef={register({ required: "Enter your password" })}
          />
          <FormFeedback>
            {errors.password && errors.password.message}
          </FormFeedback>
        </FormGroup>
        <br />
        {!success && (
          <Button type="submit" size="lg" block>
            Register
          </Button>
        )}

        <br />
        {success && (
          <Alert color="success">
            {success + "   please login now "}
            {/* <input href="/login">log in</input> */}
          </Alert>
        )}
        {success && (
          <Button onClick={handleClick} size="lg" block type="submit">
            {" "}
            login{" "}
          </Button>
        )}

        {failure && <Alert color="danger"> {failure}</Alert>}
      </Form>
    </div>
  );
};

export default RegisterForm;
