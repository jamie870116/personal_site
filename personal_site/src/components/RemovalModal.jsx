import React from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/removalModal.css'
import { useNavigate } from "react-router-dom";

function RemovalModal(props) {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false)
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    React.useEffect(() => {
        !isAuthenticated && navigate("/Blogs");
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setIsAuthenticated(loggedInUser);
        }
    }, []);


    function toggle() {
        setIsOpen(prev => !prev)
    }

    return (
        <>
            <Button className="btn-del" color="danger" onClick={() => toggle()}>Remove</Button>
            <Modal className="modal-custom" isOpen={isOpen} toggle={() => toggle()}>
                <ModalHeader toggle={toggle}>
                    Do you really wanna delete this diary?
                </ModalHeader>
                <ModalFooter>
                    <Button type="button" color="primary" className="btn-cancel" onClick={() => toggle()}>Cancel</Button>
                    <Button
                        type="button"
                        color="danger"
                        className="btn-del"
                        // eslint-disable-next-line react/prop-types
                        onClick={() => props.deleteBlog(props.pk)}
                    >
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )

}
export default RemovalModal;