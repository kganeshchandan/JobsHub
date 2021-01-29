import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useForm } from "react-hook-form";
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
  Table,
} from "reactstrap";
import axios from "axios";

const Arating = (props) => {
  const { jobID, applicantID, status, applicationID } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [ratit, setratit] = useState(false);
  const [value, setValue] = useState(2);
  const { register, handleSubmit, errors } = useForm();

  function compare() {
    if (status === "Accepted") {
      return true;
    } else {
      return false;
    }
  }
  async function onsubmit(data) {
    await axios.post(
      `http://localhost:5000/joblist/rab/acr/r/${jobID}/${applicantID}`,
      {
        rating: { value },
      }
    );
    console.log("raaating is", data);
  }
  return (
    <div>
      {compare() && (
        <Button color="danger" onClick={toggle}>
          Rate
        </Button>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form onSubit={handleSubmit(onsubmit)}>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            {/* <Input name="rating" value={value}></Input */}
            <Button>submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Arating;
