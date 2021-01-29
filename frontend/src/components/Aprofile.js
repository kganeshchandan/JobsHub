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
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import CreatableSelect from "react-select/creatable";

const options = [
  { value: "C++", label: "C++" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "#C", label: "#C" },
  { value: "Flask", label: "Flask" },
  { value: "React", label: "React" },
  { value: "MySQL", label: "MySQL" },
  { value: "MatLab", label: "MatLab" },
  { value: "Oracle", label: "Oracle" },
  { value: "Html", label: "Html" },
  { value: "CSS", label: "CSS" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "NodeJS", label: "NodeJS" },
  { value: "Swift", label: "Swift" },
  { value: "electron", label: "electron" },
];
const Aprofile = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm();

  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const jobtype = localStorage.getItem("jobtype") || null;

  const [SKILL, setSkill] = useState([]);

  function refreshPage() {
    window.location.reload(false);
  }
  async function onSubmit(data) {
    console.log("Data submitted: ", data);

    console.log("pog", userID);
    await axios
      .post(`http://localhost:5000/Aprofile/post/${userID}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setUser({
          _id: response.data.userID,
          email: response.data.email,
          skills: response.data.skills,
          education: response.data.education,
          name: response.data.name,
          rating: response.data.rateSum / (response.data.ratings || 1),
        });
        console.log(response.data.skills);
        localStorage.setItem(
          "rating",
          response.data.rateSum / (response.data.ratings || 1)
        );
        console.log("rating ", localStorage.getItem("rating"));
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("skills", JSON.stringify(response.data.skills));
      })
      .catch(function (error) {
        console.log(error);
      });
    refreshPage();
  }

  return (
    <div className="loginform">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            defaultValue={user.name}
            name="name"
            type="text"
            innerRef={register({ required: "Required" })}
            invalid={errors.name}
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
          <Label for="skills">Skills</Label>
          <Controller
            defaultValue={
              user.skills && JSON.parse(localStorage.getItem("skills"))
            }
            name="skills"
            control={control}
            as={CreatableSelect}
            isMulti
            options={options}
          />
          <FormFeedback>{errors.skills && errors.skills.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="Rating">Rating: {localStorage.getItem("rating")} </Label>
        </FormGroup>
        <Label>
          {" "}
          You can only apply for a job after submitting the profile details
          atleast once
        </Label>
        <hr />
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default Aprofile;
