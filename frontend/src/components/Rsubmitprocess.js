import react, { useEffect } from "react";
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
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Badge,
} from "reactstrap";
import "../App.css";
import axios from "axios";
import logo from "../../src/logo.svg";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import RecruiterUI from "./recruiterUI";

const Rsubmitprocess = (props) => {
  const { jobID, applicantID, applicationID, astatus } = props;

  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors, control } = useForm();
  const history = useHistory();

  const [rejectApp, setrejectApp] = useState([]);

  useEffect(() => {
    console.log("usinggg");
    axios
      .get(
        `http://localhost:5000/application/applicant/dashboard/${applicantID}`
      )
      .then((response) => {
        setrejectApp(
          response.data
            .filter((d) => d._id !== applicationID)
            .map((s) => ({ id: s._id }))
        );
        console.log(response.data);
        console.log("....");

        console.log(
          response.data
            .filter((d) => d._id !== applicationID)
            .map((s) => ({ id: s._id }))
        );
      });
  }, []);
  function refreshPage() {
    window.location.reload(false);
  }
  async function acceptjob() {
    await axios
      .post(`http://localhost:5000/application/acceptApp/${applicationID}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
    // console.log("id", duh);
    var i;
    for (i = 0; i < rejectApp.length; i++) {
      await axios
        .post(
          `http://localhost:5000/application/rejectApp/${rejectApp[i].id}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    // refreshPage();
  }
  return (
    <Button color="success" onClick={() => acceptjob()}>
      {" "}
      Accept{" "}
    </Button>
  );
};
export default Rsubmitprocess;
