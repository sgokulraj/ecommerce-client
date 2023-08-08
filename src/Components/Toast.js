import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useState } from 'react';
import "../Stylesheets/Toast.css"

function ToastMsg({ img, prodName }) {
    const [show, setShow] = useState(true);
    return (
        <ToastContainer position="top-end" className="p-3 toastContainer" style={{ zIndex: 1 }} >
            <Toast bg={"warning"} onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <img
                        src={img}
                        className="rounded me-2"
                        alt="img"
                        style={{ width: "50px", height: "50px" }}
                    />
                    <strong className="me-auto">{prodName}</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>Added to cart.</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastMsg