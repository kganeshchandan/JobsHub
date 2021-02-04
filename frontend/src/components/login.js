import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
  Alert,
  Row,
  Col,
  Container,
} from "reactstrap";
import "../App.css";
import axios from "axios";
import logo from "../../src/logo.svg";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";

const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  async function onSubmit(data) {
    console.log("Data submitted: on login", data);
    await axios
      .post("http://localhost:5000/userlist/login", data)
      .then((response) => {
        setUser({
          _id: response.data._id,
          email: response.data.email,
          jobtype: response.data.jobtype,
        });
        console.log("during login ", response.data);
        localStorage.setItem("_id", response.data._id);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("jobtype", response.data.jobtype);

        if (response.data.jobtype === "recruiter") {
          history.push("/Rdashboard");
        } else {
          history.push("/Adashboard");
        }
      })
      .catch((error) => {
        setFailure(error.response.data);
        setTimeout(() => setFailure(false), 3000);

        console.log(error);
      });
  }
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
    history.push("/register");
  }
  return (
    <Container fluid>
      <Row>
        <Col style={{ backgroundColor: "white" }}>
          <img src={logo} className="App-logo" alt="logo" />
        </Col>
        <Col>
          <div className="loginform">
            <h3 style={{ textAlign: "center" }}> Enter Credentials </h3>
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
                <FormFeedback>
                  {errors.email && errors.email.message}
                </FormFeedback>
              </FormGroup>

              <br />

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

              <Button type="submit" size="lg" block>
                Login
              </Button>
              <br></br>
              <FormGroup>
                <h5>Dont have an account ?</h5>
              </FormGroup>
              <Button onClick={handleClick} size="lg" block type="submit">
                {" "}
                Sign UP{" "}
              </Button>
              <br />
              {success && <Alert color="success"> {success}</Alert>}
              {failure && <Alert color="danger"> {failure}</Alert>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
