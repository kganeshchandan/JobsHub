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
import Rextra from "./Rextra";

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

const Rdashboard = () => {
  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors, control } = useForm();
  const history = useHistory();
  const [joblist, setJobs] = useState([]);
  const [bool, setbool] = useState(false);
  const [profilebool, setProfilebool] = useState(false);
  const [makejobBool, setmakejobBool] = useState(false);
  const [jobalert, setjobalert] = useState(false);
  const [statusbool, setStatusbool] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/joblist/find/${userID}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // console.log("userid", userID);
        // console.log(response.data);
        setJobs(
          response.data.map((s) => ({
            status: s.status,
            title: s.title,
            DOP: s.DeadlineDate,
            appnos: s.maxApplications,
            apppos: s.availPos,
            id: s._id,
          }))
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // console.log("id bro", joblist);
  async function makejob(e) {
    setmakejobBool(!makejobBool);
  }
  async function submitjob(data) {
    console.log("data", data);
    await axios
      .post(`http://localhost:5000/joblist/postjob/${userID}`, data)
      .then((response) => {
        // console.log("rrr", response.data);
        setjobalert(response.data);
        setTimeout(() => {
          setjobalert(false);
        }, 2000);
      })
      .catch((error) => {
        console.log("eee", error);
      });
    history.push("/Rdashboard");
    setmakejobBool(!makejobBool);
  }

  async function editjob(data) {
    console.log("id is a ", data);
    return <Rmodal />;
  }
  // async function viewjob(data) {
  //   localStorage.setItem("viewjobID", data);
  //   history.push("/Rviewapps");
  //   console.log("id is b", data);
  // }
  async function deletejob(data) {
    setStatusbool(false);
    await axios
      .post(`http://localhost:5000/joblist/delete/${data}`)
      .then((response) => {
        console.log("job closed");
      })
      .catch((error) => {
        console.log(error.response);
      });
    console.log("id is c", data);
  }

  //   async function appfunc(data){
  // return data;
  //   };
  //   async function posfunc(data){
  // return data;
  //   };
  return (
    <Container fluid>
      <Col>
        <Row>
          <RecruiterUI />
        </Row>

        <Row>
          <Col md={3} className="loginform3">
            hello
          </Col>
          {/* <Col> */}
          <Col>
            <Col>
              <div className="loginform3">
                <Button color="primary" block onClick={makejob}>
                  Create A job
                </Button>
                {makejobBool && (
                  <div className="loginform2">
                    <Form onSubmit={handleSubmit(submitjob)}>
                      <FormGroup>
                        <Label htmlFor="inputEmail">E-mail</Label>
                        <Input
                          readOnly
                          defaultValue={useremail}
                          type="email"
                          id="inputEmail"
                          name="email"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="inputEmail">Your name</Label>
                        <Input
                          invalid={errors.name}
                          defaultValue={user.name}
                          type="text"
                          id="inputEmail"
                          name="name"
                          innerRef={register({ required: "Enter your name" })}
                        />
                        <FormFeedback>
                          {errors.name && errors.name.message}
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="inputEmail">Job Title</Label>
                        <Input
                          invalid={errors.title}
                          type="text"
                          name="title"
                          innerRef={register({
                            required: "Enter your Title",
                          })}
                        />
                        <FormFeedback>
                          {errors.title && errors.title.message}
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleSelect">Job type</Label>
                        <Input
                          type="select"
                          name="jobtype"
                          id="exampleSelect"
                          innerRef={register({ required: true })}
                        >
                          <option value="Part-Time">Part-Time</option>
                          <option value="Full-Time">Full-Time</option>
                          <option value="Work from home">Work from home</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleSelect">Duration in months</Label>
                        <Input
                          type="select"
                          name="duration"
                          innerRef={register({ required: true })}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="inputEmail">
                          Maximum no. of applications
                        </Label>
                        <Input
                          invalid={errors.maxapp}
                          type="number"
                          name="maxapp"
                          innerRef={register({
                            required: "Enter a number",
                            pattern: {
                              value: /^\d+$/i,
                              message: "Enter a positive number",
                            },
                          })}
                        />
                        <FormFeedback>
                          {errors.maxapp && errors.maxapp.message}
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="inputEmail">
                          Maximum no. of Positions{" "}
                        </Label>
                        <Input
                          invalid={errors.maxpos}
                          type="number"
                          name="maxpos"
                          innerRef={register({
                            required: "Enter a number",
                            pattern: {
                              value: /^\d+$/i,
                              message: "Enter a positive number",
                            },
                          })}
                        />
                        <FormFeedback>
                          {errors.maxpos && errors.maxpos.message}
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="inputEmail">Deadline</Label>
                        <Input
                          invalid={errors.deadline}
                          type="date"
                          name="deadline"
                          innerRef={register({
                            required: "Enter this field",
                          })}
                        />
                        <FormFeedback>
                          {errors.deadline && errors.deadline.message}
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="skills">Required SkillSet</Label>
                        <Controller
                          // defaultValue={JSON.parse(localStorage.getItem("skills"))}
                          name="skills"
                          control={control}
                          as={CreatableSelect}
                          isMulti
                          options={options}
                        />
                        <FormFeedback>
                          {errors.skills && errors.skills.message}
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="inputEmail">Salary per month</Label>
                        <Input
                          invalid={errors.salary}
                          type="number"
                          name="salary"
                          innerRef={register({
                            required: "Enter a salary",
                            pattern: {
                              value: /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/,
                              message: "Enter a valid salary",
                            },
                          })}
                        />
                        <FormFeedback>
                          {errors.salary && errors.salary.message}
                        </FormFeedback>
                      </FormGroup>

                      <Button>Submit</Button>
                    </Form>
                  </div>
                )}
                {jobalert && <Alert color="success">{jobalert}</Alert>}
              </div>
            </Col>
            <Col>
              <div className="display-4 my-5">Job Listings</div>
              <Row>
                {joblist.map((user, i) => (
                  <Col md={6}>
                    <Card className="mb-5 loginform3">
                      <CardHeader>
                        <h3> {user.title}</h3>
                      </CardHeader>
                      <CardBody>
                        {/* <Row>
                          <Col xs="6">
                            {" "}
                            current Applications : /{user.appnos}
                          </Col>
                          <Col xs="6"> Current Positions : / {user.apppos}</Col>
                        </Row>
                        <hr />
                        <Row>Deadline : {user.DOP}</Row> */}
                        <Rextra
                          jobID={user.id}
                          appnos={user.appnos}
                          apppos={user.apppos}
                          DOP={user.DOP}
                        />
                      </CardBody>

                      {user.status && (
                        <CardFooter>
                          <div
                            className="d-flex "
                            style={{ justifyContent: "space-around" }}
                          >
                            <Rmodal buttonLabel="Edit" id={user.id} />

                            <Container className="d-flex justify-content-end">
                              <Button
                                type="button"
                                color="danger"
                                onClick={() => deletejob(user.id)}
                              >
                                Delete
                              </Button>

                              {/* <Button
                                type="button"
                                color="info"
                                onClick={() => viewjob(user.id)}
                              >
                                View
                              </Button> */}
                            </Container>
                          </div>
                        </CardFooter>
                      )}
                      {!user.status && (
                        <CardFooter>
                          <Alert color="danger">Deleted</Alert>

                          {/* <Button
                            type="button"
                            color="info"
                            size="lg"
                            onClick={() => viewjob(user.id)}
                          >
                            View Applications
                          </Button> */}
                        </CardFooter>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Col>
          {/* </Col> */}
        </Row>
      </Col>
    </Container>
  );
};

export default Rdashboard;
