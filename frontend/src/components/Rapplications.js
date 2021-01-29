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
import Rrating from "./Rrating";
import Arating from "./Arating";

const Rapplications = () => {
  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors, control } = useForm();
  const history = useHistory();
  const jobID = localStorage.getItem("viewjobID");
  const [List, setList] = useState([]);

  function isaccept(data) {
    if (data === "Accepted") {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5000/application/byrecruiter/by/rec/${userID}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("roooo", response.data);
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
              jbool: s.Jbool,
            }))
          );

          console.log(
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
              jbool: s.Jbool,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid>
      <RecruiterUI />
      {List.map((s, i) => (
        <Col>
          {isaccept(s.status) && (
            <Card className="mb-5">
              <CardHeader>
                <h3> {s.aname}</h3>
              </CardHeader>
              <CardBody>
                applicantID: {s.applicantID}
                <br />
                {/* status: {s.status},<br /> */}
                skills: {s.skills},<br />
                DOA: {s.DOA}, <br />
                aeducation: {s.aeducation},<br />
                SOP: {s.SOP},<br />
                rating: {s.rating}
                {!s.jbool && (
                  <Rrating
                    applicationID={s.appID}
                    applicantID={s.applicantID}
                    status={s.status}
                  />
                )}
              </CardBody>
            </Card>
          )}
        </Col>
      ))}
    </Container>
  );
};
export default Rapplications;
