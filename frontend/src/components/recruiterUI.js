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
  Row,
  Col,
  Container,
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
import Rprofile from "./Rprofile";
// import Rdashboard from "./Rdashoard";
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
const RecruiterUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilebool, setProfilebool] = useState(false);
  const [makejobBool, setmakejobBool] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors, control } = useForm();
  const history = useHistory();
  const [jobalert, setjobalert] = useState(false);
  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const jobtype = localStorage.getItem("jobtype") || null;
  const username = localStorage.getItem("name") || null;

  async function logout() {
    localStorage.clear();
    history.push("/login");
  }
  async function toggleProfile() {
    setProfilebool(!profilebool);
    await axios
      .get(`http://localhost:5000/Rprofile/${userID}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("response.data..", response.data);
        if (response.data) {
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("BioData", response.data.BioData);
          localStorage.setItem("contact", response.data.contact);
          setUser({
            // _id: localStorage.getItem("_id") || null,
            email: localStorage.getItem("email") || null,
            // jobtype: localStorage.getItem("jobtype") || null,
            name: localStorage.getItem("name") || null,
            BioData: localStorage.getItem("BioData") || null,
            contact: localStorage.getItem("contact") || null,
          });
        }
      });
  }

  return (
    <Container fluid>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Job Portal</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/Rdashboard/">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Rapplications/">Applications</NavLink>
            </NavItem>
            <NavItem></NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                My Details
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem> Job : {jobtype}</DropdownItem>
                <DropdownItem> email : {useremail}</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={toggleProfile}>Profile</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText type="button" onClick={logout}>
            Log out
          </NavbarText>
        </Collapse>
      </Navbar>
      {/* this is the profile section */}
      {profilebool && <Rprofile />}
    </Container>
  );
};

export default RecruiterUI;
