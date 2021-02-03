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
  const [value, setValue] = useState(0);
  const { register, handleSubmit, errors } = useForm();

  function compare() {
    if (status === "Accepted") {
      return true;
    } else {
      return false;
    }
  }
  function onsubmit(data) {
    axios
      .post(
        `http://localhost:5000/joblist/rab/acr/r/x/${jobID}/${applicantID}`,
        {
          rating: value,
        }
      )
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error.response.data));

    console.log("raaating is", value);

    // console.log(re.status);
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
          <Form>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            {/* <Input name="rating" value={value}></Input */}
            <Button type="button" onClick={onsubmit}>
              submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Arating;
