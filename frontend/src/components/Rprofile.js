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
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import "../App.css";
import axios from "axios";
import logo from "../../src/logo.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

const Rprofile = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const jobtype = localStorage.getItem("jobtype") || null;

  async function onSubmit(data) {
    console.log("Data submitted: ", data);
    console.log("pog", userID);

    await axios
      .post(`http://localhost:5000/Rprofile/saveprofile/${userID}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setUser({
          _id: response.data.userID,
          email: response.data.email,
          contact: response.data.contact,
          BioData: response.data.BioData,
          name: response.data.name,
        });
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("BioData", response.data.BioData);
        localStorage.setItem("contact", response.data.contact);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }
  return (
    <div className="loginform">
      <h3 style={{ textAlign: "center" }}> Profile Details </h3>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            defaultValue={user.name}
            invalid={errors.name}
            type="text"
            name="name"
            innerRef={register({
              required: "Enter your name",
            })}
          />
          <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="inputEmail">E-mail</Label>
          <Input
            readOnly
            value={user.email}
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
          <Label htmlFor="bio">Bio</Label>
          <Input
            defaultValue={user.BioData}
            invalid={errors.BioData}
            type="textarea"
            name="BioData"
            innerRef={register({ required: "Enter your Bio Data" })}
          />
          <FormFeedback>
            {errors.BioData && errors.BioData.message}
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="contactNo">Contact No</Label>
          <Input
            defaultValue={user.contact}
            name="contact"
            type="number"
            innerRef={register({ required: "Required" })}
            invalid={errors.contact}
          />
          <FormFeedback>
            {errors.contact && errors.contact.message}
          </FormFeedback>
        </FormGroup>
        <Button type="submit" block>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default Rprofile;
