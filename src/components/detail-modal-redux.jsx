import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Modal, CloseButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addBusiness } from '../store/business-slice';
let isInitialized = true;
function DetailModalRedux(props) {
    const { show, onHide, id } = props;
    const dispatch = useDispatch();
    let businessList = useSelector(state => state.business.items);
    let selectedBusiness = businessList ? businessList.find(item => item.id === id) : "";
    useEffect(() => {
        // read data from "local Storage" for the first time or if page is refreshed (reloaded).
        if (!isInitialized) {
            return;
        }
        JSON.parse(localStorage.getItem("BusinessList")).map(item => dispatch(addBusiness(item)));
        isInitialized = false; //* not used
    }, [dispatch]);
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
                                        <h6 className="text-muted">With Redux</h6>
                                        <h6>Company Name: {selectedBusiness.company_name}</h6>
                                        <h6>Address: {selectedBusiness.website}</h6>
                                        <h6>Website: {selectedBusiness.address}</h6>
                                        <br />
                                        <div>
                                            <Row>
                                                <Col xs="12" md="3" className="">Hourse:</Col>
                                                <Col xs="12" md="9" className="p-2">
                                                    {selectedBusiness.hours.map((item, index) => <h6 key={index}>{item.day + ": " + item.open + "-" + item.close}</h6>)}
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
export default DetailModalRedux;
