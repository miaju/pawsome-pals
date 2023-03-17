import { Modal, Button, Spinner } from "react-bootstrap"

const UnMatchPopup = (props) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={() => props.setShow(false)}
    >
      <Modal.Header><h1>Whoa!</h1></Modal.Header>
      <Modal.Body>
        Are you sure you want to unlike this pet? This action is irreversible, and the current pet will not see this pet in explore again.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setShow(false)} variant="secondary">
          No, I don't.
        </Button>
        <Button onClick={props.unMatch} variant="danger">
          {!props.loading ? "Yes I do." : <Spinner/>}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UnMatchPopup;
