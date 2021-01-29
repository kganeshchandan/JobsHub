import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import axios from "axios";

const Rmodal = (props) => {
  const { buttonLabel, className, id } = props;
  const userID = localStorage.getItem("_id") || null;
  const useremail = localStorage.getItem("email") || null;
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors, control } = useForm();
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  async function onsubmit(data) {
    console.log("data", data);
    await axios
      .post(`http://localhost:5000/joblist/editjob/${id}`, data)
      .then((response) => {
        console.log("rrr", response.data);
      })
      .catch((error) => {
        console.log("eee", error);
      });
    history.push("/Rdashboard");
  }

  return (
    <Container fluid>
      <Button color="success" type="button" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Enter the new details.
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onsubmit)}>
            <FormGroup>
              <Label htmlFor="inputEmail">Maximum no. of applications</Label>
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
              <Label htmlFor="inputEmail">Maximum no. of Positions </Label>
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
            <Button type="submit">Save Changes</Button>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default Rmodal;
