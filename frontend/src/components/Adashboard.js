import react, { useEffect } from "react";
import React from "react";
import {
  Row,
  Col,
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
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
} from "reactstrap";
import "../App.css";
import axios from "axios";
import logo from "../../src/logo.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import ApplicantUI from "./applicantUI";
import Sidebar from "./sidebar";
import ApplyjobModal from "./ApplyjobModal";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import shadows from "@material-ui/core/styles/shadows";

const Adashboard = () => {
  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const yeet = localStorage.setItem("yeet", false);
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [jobs, setJobs] = useState([]);
  const [bool, setbool] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/joblist", {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("jobslist skills", response.data);
        setJobs(
          response.data.map((s) => ({
            id: s._id,
            date: s.DatePosted,
            title: s.title,
            recruiterName: s.RecruiterName,
            recruiterEmail: s.RecruiterEmail,
            maxapp: s.maxApplications,
            maxpos: s.availPos,
            appdead: s.DeadlineDate,
            skills: s.SkillSet,
            jobtype: s.jobTime,
            duration: s.duration,
            salary: s.salary,
            ratings: s.RateSum / (s.Ratings || 1),
            status: s.status,
          }))
        );
      })
      .catch(function (error) {
        console.log(error);
        // setFailure(error.response.data);
        // setTimeout(() => setFailure(false), 3000);
      });
  }, []);
  // /////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [descending, setDescending] = useState(false);
  const jobTypes = new Set(["Part-Time", "Full-Time", "Work from home"]);
  const [typeFilter, setTypeFilter] = useState(jobTypes);
  const [salaryFilter, setSalaryFilter] = useState({
    from: -Infinity,
    to: Infinity,
  });
  const [durationFilter, setDurationFilter] = useState(7);
  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
    const sortOrders = {
      salary: (a, b) => a.salary - b.salary,
      duration: (a, b) => a.duration - b.duration,
      rating: (a, b) => a.ratings - b.ratings,
      default: (o) => o,
    };
    if (descending) {
      setFilteredList(
        jobs
          .filter((o) =>
            o.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((o) => typeFilter.has(o.jobtype))
          .filter(
            (o) => salaryFilter.from <= o.salary && o.salary <= salaryFilter.to
          )
          .filter((o) => o.duration < durationFilter)
          .sort(sortOrders[sortOrder])
          .reverse()
      );
    } else {
      setFilteredList(
        jobs
          .filter((o) =>
            o.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((o) => typeFilter.has(o.jobtype))
          .filter(
            (o) => salaryFilter.from <= o.salary && o.salary <= salaryFilter.to
          )
          .filter((o) => o.duration < durationFilter)
          .sort(sortOrders[sortOrder])
      );
    }
  }, [
    searchTerm,
    sortOrder,
    descending,
    typeFilter,
    salaryFilter,
    durationFilter,
    jobs,
  ]);

  return (
    <Container fluid>
      <ApplicantUI />

      <Row>
        <Col md={3} className="loginform2">
          hello M
          <Sidebar
            setSearchTerm={setSearchTerm}
            setSortOrder={setSortOrder}
            setDescending={setDescending}
            descending={descending}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            salaryFilter={salaryFilter}
            setSalaryFilter={setSalaryFilter}
            setDurationFilter={setDurationFilter}
          />
        </Col>
        <Col>
          <div className="display-4 ">Job Listings</div>
          <div className="display-4 my-5 ">
            <Input
              className="loginform3"
              type="text"
              placeholder="Search Jobs"
              onChange={(e) => setSearchTerm(e.target.value)}
            ></Input>
          </div>
          <Row>
            {filteredList.map((user, i) => (
              <Col md={6}>
                <Card className="mb-5" className="loginform3">
                  <CardHeader
                    body
                    inverse
                    style={{
                      backgroundColor: "#8663e6",
                      borderColor: "#8663e6",
                    }}
                  >
                    <h3 style={{ color: "white" }}> {user.title}</h3>
                  </CardHeader>
                  <CardBody>
                    <Container fluid>
                      <Row>
                        <Col xs="3"> By.</Col>
                        <Col xs="auto" className="display-4">
                          {user.recruiterName}
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                          {user.recruiterEmail}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <hr />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6"> DatePosted : {user.date}</Col>
                        <Col xs="6"> Application Deadline : {user.appdead}</Col>
                      </Row>
                      <hr />
                      {user.skills.map((s, i) => (
                        <Badge style={{ margin: "5px" }} color="light">
                          <h6> {s} </h6>
                        </Badge>
                      ))}
                      <br />
                      <Row>
                        <Col xs="6">
                          <Badge color="primary">
                            <h5>{user.jobtype}</h5>
                          </Badge>
                        </Col>
                        <Col xs="6">
                          <Badge color="success">
                            <h5>{user.duration} Months</h5>
                          </Badge>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs="6"> Max Applications : {user.maxapp}</Col>
                        <Col xs="6"> Max Positions : {user.maxpos}</Col>
                      </Row>
                      <hr />
                      <Box className="d-flex justify-contenet-end">
                        <Col xs="6"></Col>
                        <Col xs="6">
                          <Typography component="legend">Ratings</Typography>
                          <Rating
                            name="read-only"
                            value={user.ratings}
                            readOnly
                          />
                        </Col>
                      </Box>
                    </Container>
                  </CardBody>
                  <CardFooter className="d=flex justify-content-end">
                    <Row>
                      <Col xs="6">
                        {" "}
                        <h4>&#x20B9; {user.salary}</h4>
                      </Col>
                      <Col xs="6" className="d=flex justify-content-end">
                        {user.status && (
                          <ApplyjobModal id={user.id} jobstatus={user.status} />
                        )}
                      </Col>
                    </Row>

                    {!user.status && (
                      <Alert color="danger">
                        Job Closed
                        <div>
                          <ApplyjobModal id={user.id} jobstatus={user.status} />
                        </div>
                      </Alert>
                    )}
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Adashboard;
