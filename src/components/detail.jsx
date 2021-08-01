import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const apiEndPoint = "https://smoothcommerce.tech/api.json";
const Detail = (props) => {
    const params = useParams();
    const [selectedBusiness, setSelectedBusiness] = useState({});
    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(apiEndPoint, { 'Content-Type': 'application/json' });
            let selectedBusiness = data.find(item => item.id === parseInt(params.id));
            setSelectedBusiness(selectedBusiness);
            console.log("Hi From [detail.jsx]");
        }
        fetch().catch(error => { console.log("Somthing went wrong on the server.") });
    }, [params.id]);
    return (
        <Container fluid>
            <Row >
                <Col xs={12} className="p-5">
                    <h4>Detail</h4>
                    <Route path={'/detail/15'}>
                        <h5>This Is Desired Company</h5>
                    </Route>
                    {selectedBusiness &&
                        <Row key={selectedBusiness.id} className="mb-3 mt-3 shadow-box border rounded">
                            <Col xs={12} lg={5} className="p-3 text-center"><img className="img img-thumbnail" src={selectedBusiness.image} width="100%" height="100%" alt={selectedBusiness.company_name} /></Col>
                            <Col xs={12} lg={7} className="p-3 mt-4">
                                <h6>Company Name: {selectedBusiness.company_name}</h6>
                                <h6>Address: {selectedBusiness.website}</h6>
                                <h6>Website: {selectedBusiness.address}</h6>
                                <br />
                                <div>
                                    <Row>
                                        <Col xs="12" md="2" className="">Hourse:</Col>
                                        {selectedBusiness.hours &&
                                            <Col xs="12" md="10" className="p-0">
                                                {selectedBusiness.hours.map((item, index) => <h6 key={index}>{item.day + ": " + item.open + "-" + item.close}</h6>)}
                                            </Col>
                                        }
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

export default Detail;