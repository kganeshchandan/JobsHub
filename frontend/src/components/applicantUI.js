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
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import Aprofile from "./Aprofile";
import Adashboard from "./Adashboard";

const ApplicantUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [profilebool, setProfilebool] = useState(true);

  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const jobtype = localStorage.getItem("jobtype") || null;
  const [SKILL, setSkill] = useState([]);
  async function logout() {
    localStorage.clear();
    history.push("/login");
  }

  async function toggleProfile() {
    await axios
      .get(`http://localhost:5000/Aprofile/${userID}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("response.data..", response.data);
        if (response.data) {
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("skills", JSON.stringify(response.data.skills));

          localStorage.setItem(
            "rating",
            response.data.rateSum / (response.data.ratings || 1)
          );
          console.log("rating ", localStorage.getItem("rating"));

          console.log("skills", localStorage.getItem("skills"));

          setUser({
            // _id: localStorage.getItem("_id") || null,
            email: localStorage.getItem("email") || null,
            // jobtype: localStorage.getItem("jobtype") || null,
            name: localStorage.getItem("name") || null,
            skills: localStorage.getItem("skills") || null,
            // education: localStorage.getItem("education") || null,
          });
        }
      });
    setProfilebool(!profilebool);
  }
  return (
    <div Container="fluid">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/Adashboard/">Job Portal</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/Adashboard/">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Aapplications/">My applications</NavLink>
            </NavItem>
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

      {profilebool && <Aprofile />}
    </div>
  );
};

export default ApplicantUI;
