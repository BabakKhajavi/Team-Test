import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Modal, CloseButton } from 'react-bootstrap';
import axios from 'axios';
const apiEndPoint = "https://smoothcommerce.tech/api.json";
function DetailModal(props) {
    const { show, onHide, id } = props;
    const [selectedBusiness, setSelectedBusiness] = useState({});
    const [hours, setHours] = useState([]);
    useEffect(() => {
        let list = []
        const fetch = async () => {
            const { data } = await axios.get(apiEndPoint, { 'Content-Type': 'application/json' });
            let selectedBusiness = data.find(item => item.id === id);
            setSelectedBusiness(selectedBusiness);
            selectedBusiness.hours.map(item => list.push(item))
            setHours(list);
        }
        fetch().catch(error => { console.log("Somthing went wrong on the server.") });
    }, [id]);
    return (
        <div>
            <Modal
                size="md"
                show={show}
                onHide={onHide}
                backdrop="static"
                centered
                aria-labelledby="example-custom-modal-styling-title"
            >

                <Modal.Body className="m-0 p-0">
                    <Container fluid>
                        <Row >
                            <Col xs={12} className="text-left p-0 m-0">
                                <Card>
                                    <CloseButton onClick={onHide} variant="white" size='lg' className="position-right-top" />
                                    <Card.Img variant="top" src={selectedBusiness.image} />
                                    <Card.Body>
                                        <h6 className="text-muted">Without Redux</h6>
                                        <h6>Company Name: {selectedBusiness.company_name}</h6>
                                        <h6>Address: {selectedBusiness.website}</h6>
                                        <h6>Website: {selectedBusiness.address}</h6>
                                        <br />
                                        <div>
                                            <Row>
                                                <Col xs="12" md="3" className="">Hourse:</Col>
                                                <Col xs="12" md="9" className="p-2">
                                                    {hours.map((item, index) => <h6 key={index}>{item.day + ": " + item.open + "-" + item.close}</h6>)}
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}
DetailModal.propTypes = {
    id: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};
export default DetailModal;
