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
import Rsubmitprocess from "./Rsubmitprocess.js";

const Rviewapps = () => {
  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors, control } = useForm();
  const history = useHistory();
  const jobID = localStorage.getItem("viewjobID");
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
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function statusfunc(data) {
    if (data === "Applied") {
      return true;
    } else {
      return false;
    }
  }
  function isreject(data) {
    if (data === "Rejected") {
      return false;
    } else {
      if (data === "Accepted") {
        return false;
      } else {
        return true;
      }
    }
  }
  function refreshPage() {
    window.location.reload(false);
  }
  async function shortlistjob(id) {
    axios
      .post(`http://localhost:5000/application/shortlistApp/${id}`)
      .then((response) => {
        console.log("shortlisted");
      });
    console.log(id);
    refreshPage();
  }
  //   async function acceptjob(id) {
  //     axios
  //       .post(`http://localhost:5000/application/acceptApp/${id}`)
  //       .then((response) => {
  //         console.log("Accepted");
  //       });
  //     console.log(id);
  //     // refreshPage();
  //   }
  async function rejectjob(id) {
    axios
      .post(`http://localhost:5000/application/rejectApp/${id}`)
      .then((response) => {
        console.log("shortlisted");
      });
    console.log(id);
    refreshPage();
  }
  return (
    <Container fluid>
      <RecruiterUI />
      {userID}
      <br />
      {jobID}
      {List.map((s, i) => (
        <Col>
          {isreject(s.status) && (
            <Card className="mb-5">
              <CardHeader>
                <h3> {s.aname}</h3>
              </CardHeader>
              <CardBody>
                applicantID: {s.applicantID}
                <br />
                status: {s.status},<br />
                {s.skills.map((a, i) => (
                  <Badge style={{ margin: "5px" }} color="light">
                    <h6> {a} </h6>
                  </Badge>
                ))}
                {/* Skills:{s.skills} */}
                DOA: {s.DOA}, <br />
                aeducation: {s.aeducation},<br />
                SOP: {s.SOP},<br />
                rating: {s.rating}
              </CardBody>
              <CardFooter className="d=flex justify-content-end">
                {statusfunc(s.status) && (
                  <div>
                    <Button
                      color="warning"
                      onClick={() => shortlistjob(s.appID)}
                    >
                      Shortlist
                    </Button>
                    <Button color="danger" onClick={() => rejectjob(s.appID)}>
                      Reject
                    </Button>
                  </div>
                )}
                {!statusfunc(s.status) && (
                  <div>
                    <Rsubmitprocess
                      applicantID={s.applicantID}
                      applicationID={s.appID}
                      jobID={jobID}
                    />
                    <Button color="danger" onClick={() => rejectjob(s.appID)}>
                      Reject
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          )}
        </Col>
      ))}{" "}
    </Container>
  );
};
export default Rviewapps;
