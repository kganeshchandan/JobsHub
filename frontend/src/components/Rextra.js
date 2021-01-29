// This thing is the box which is there in the job list
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
import Rmodal from "./Rmodal";

import CreatableSelect, { defaultProps } from "react-select/creatable";

const Rextra = (props) => {
  const { jobID, appnos, apppos, DOP } = props;
  const history = useHistory();

  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const { user, setUser } = useContext(UserContext);
  const [Appnos, setAppnos] = useState(0);
  const [Apppos, setApppos] = useState(0);
  const [List, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/application/recruiter/${userID}/${jobID}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("rid+jid", response.data);
        if (response != null) {
          setList(
            response.data.map((s) => ({
              appID: s._id,
              applicantID: s.applicantID,
              status: s.state,
              aname: s.aname,
              skills: s.skills,
              DOA: s.date,
              aeducation: s.aeducation,
              SOP: s.SOP,
              rating: s.aratesum / (s.aratings || 1),
            }))
          );
          setAppnos(response.data.length);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const len = List.filter((s) => s.status === "Accepted").length;

  async function viewjob(data) {
    localStorage.setItem("viewjobID", data);
    history.push("/Rviewapps");
    console.log("id is b", data);
  }

  return (
    <Container>
      <Row>
        <Col xs="6">
          Current Applications : {Appnos}/{appnos}
        </Col>
        <Col xs="6">
          Accepted Positions : {len}/ {apppos}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs="6">Deadline : {DOP}</Col>

        <Col xs="6 " className="justify-content-end">
          <Button type="button" color="info" onClick={() => viewjob(jobID)}>
            View Applications
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Rextra;
