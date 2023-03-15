import { Modal, Button, Spinner } from "react-bootstrap";

const DeletePetPopup = (props) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={() => props.setShow(false)}
    >
      <Modal.Header>
        <h1>Whoa!</h1>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this pet? This action is irreversible.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setShow(false)} variant="secondary">
          No, I don't.
        </Button>
        <Button onClick={props.deletePet} variant="danger">
          {!props.loading ? "Yes I do." : <Spinner />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePetPopup;
