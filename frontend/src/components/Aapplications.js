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
  Table,
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
import Arating from "./Arating";

const Aapplications = () => {
  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [applist, setApplist] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/application/findapp/findapp/${userID}`)
      .then((response) => {
        setApplist(
          response.data.map((s) => ({
            id: s._id,
            applicantID: s.applicantID,
            recruiterID: s.recruiterID,
            jobID: s.jobID,
            state: s.state,
            SOP: s.SOP,
            date: s.date,
            jobtitle: s.jobtitle,
            aeducation: s.aeducation,
            arating: s.aratesum / (s.aratings || 1),
            salary: s.salary,
            aname: s.aname,
            rname: s.rname,
            bool: s.Abool,
          }))
        );
      });
  }, []);

  return (
    <Container fluid>
      <ApplicantUI />

      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>D.O.J</th>
            <th>salary</th>
            <th>Name of Recruiter</th>
            <th>Job status</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {applist.map((s, i) => (
            <tr key="i">
              <td>{s.jobtitle}</td>
              <td>{s.dateofjoining}</td>
              <td>{s.salary}</td>

              <td>{s.rname}</td>
              <td>{s.state}</td>
              <td>
                {!s.bool && (
                  <Arating
                    jobID={s.jobID}
                    applicantID={s.applicantID}
                    status={s.state}
                    applicationID={s._id}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default Aapplications;
