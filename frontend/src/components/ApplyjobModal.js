import React, { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import {
  Row,
  Col,
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
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import "../App.css";
import axios from "axios";

const ModalExample = (props) => {
  const { id, jobstatus } = props;
  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [job, setJob] = useState([]);
  const [Buttonstatus, setbuttonstatus] = useState("Apply");
  const [Buttoncolor, setButtoncolor] = useState("success");
  const toggle = () => setModal(!modal);
  const [elig, setElig] = useState(true);

  function refreshPage() {
    window.location.reload(false);
  }
  useEffect(
    () => {
      axios
        .get(`http://localhost:5000/Aprofile/${userID}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log("response bruh", response.data);
          if (response.data == null) {
            setElig(false);
          }
        });
      axios
        .get(`http://localhost:5000/joblist/findjob/${id}`)
        .then((response) => {
          setJob({
            date: response.data.DatePosted,
            title: response.data.title,
            recruiterName: response.data.RecruiterName,
            recruiterEmail: response.data.RecruiterEmail,
            maxapp: response.data.maxApplications,
            maxpos: response.data.availPos,
            appdead: response.data.DeadlineDate,
            skills: JSON.stringify(response.data.SkillSet),
            jobtype: response.data.jobTime,
            duration: response.data.duration,
            salary: response.data.salary,
            ratings: response.data.RateSum / (response.data.Ratings || 1),
            status: response.data.status,
          });
          //   console.log("res", response.data);
        })
        .catch((error) => console.log(error.response));

      axios
        .get(`http://localhost:5000/application/${userID}/${id}`)
        .then((response) => {
          console.log("res", response.data);
          if (response.data != null) {
            if (response.data.state === "Rejected") {
              console.log("rejjj");
              setButtoncolor("danger");
              setbuttonstatus(response.data.state);
              setElig(false);
            }
            if (response.data.state === "Short-listed") {
              console.log("shorttt");
              setButtoncolor("info");
              setbuttonstatus(response.data.state);
              setElig(false);
            }
            if (response.data.state === "Applied") {
              console.log("warnn");
              setButtoncolor("warning");
              setbuttonstatus(response.data.state);
              setElig(false);
            }
            if (response.data.state === "Accepted") {
              console.log("ACCEPTED");
              setButtoncolor("Success");
              setbuttonstatus(response.data.state);
              setElig(false);
            }

            // console.log("status", response.data.state);
          }
        });
    },
    modal,
    setModal
  );
  async function onsubmit(data) {
    // console.log(data, id);
    axios
      .post(`http://localhost:5000/application/apply/${userID}/${id}`, data)
      .then((response) => {
        console.log("e", response.data);
      })
      .catch((error) => {
        console.log("r", error.response);
      });
    setModal(!Modal);
    history.push("/Adashboard/");
    refreshPage();
  }
  return (
    <div>
      {jobstatus && (
        <Button color={Buttoncolor} block onClick={toggle}>
          {Buttonstatus}
        </Button>
      )}
      {!jobstatus && <p>{Buttonstatus}</p>}

      {elig && (
        <Modal
          isOpen={modal}
          toggle={toggle}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader toggle={toggle}>
            {" "}
            Applying to the Job titled: {job.title}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onsubmit)}>
              <FormGroup>
                <Label for="some">Enter the Statement of Purpose </Label>
                <Input
                  invalid={errors.SOP}
                  type="textarea"
                  name="SOP"
                  innerRef={register({
                    required: "Enter the SOP",
                    pattern: {
                      value: /^.{1,250}$/i,
                      message: "Maximum length can only be 250 characters",
                    },
                  })}
                />
                <FormFeedback>{errors.SOP && errors.SOP.message}</FormFeedback>
              </FormGroup>
              <Button type="submit">Send Application</Button>
            </Form>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default ModalExample;
