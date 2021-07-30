import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addBusiness } from '../store/business-slice';
let isInitialized = true;
const DetailRedux = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    let businessList = useSelector(state => state.business.items);
    let selectedBusiness = businessList ? businessList.find(item => item.id === parseInt(params.id)) : "";
    useEffect(() => {
        if (!isInitialized) {
            return;
        }
        JSON.parse(localStorage.getItem("BusinessList")).map(item => dispatch(addBusiness(item)));
        console.log("date feteched from local storage [detail-redux.jsx]")
        isInitialized = false; //*
    }, [dispatch]);
    return (
        <Container fluid>
            <Row >
                <Col xs={12} className="p-5">
                    <h4>Detail Redux </h4>
                    {selectedBusiness &&
                        <Row key={0 || ""} className="mb-3 mt-3 shadow-box border rounded">
                            <Col xs={12} lg={3} className="p-3 text-center">
                                <img className="img img-thumbnail" src={selectedBusiness.image} width="100%" height="100%" alt={selectedBusiness.company_name} />
                            </Col>
                            <Col xs={12} lg={9} className="p-3 mt-4">
                                <h6>Company Name: {selectedBusiness.company_name}</h6>
                                <h6>Address: {selectedBusiness.website}</h6>
                                <h6>Website: {selectedBusiness.address}</h6>
                                <br />
                                <div>
                                    <Row>
                                        <Col xs="12" md="2" className="">Hourse:</Col>
                                        <Col xs="12" md="10" className="p-0">
                                            {selectedBusiness.hours.map((item, index) => <h6 key={index}>{item.day + ": " + item.open + "-" + item.close}</h6>)}
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
        </Container>
    );
};
export default DetailRedux;