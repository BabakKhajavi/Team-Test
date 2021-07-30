import React, { useEffect, useState, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DetailModal from './detail-modal';
const apiEndPoint = "https://smoothcommerce.tech/api.json";
const TableContent = React.lazy(() => import('./table'));
const Main = () => {
    const history = useHistory();
    const [businessList, setBusinessList] = useState([]);
    //use by table 
    const pageSize = 10;
    const columnTitles = ["ID", 'Business Name', 'Website', 'Adress', 'View in Routes', 'View in Modals'];
    const columnList = ["id", 'company_name', 'website', 'address'];
    const filteredItem = "company_name";
    //
    const [itemId, setItemId] = useState(0);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(apiEndPoint, { 'Content-Type': 'application/json' });
            setBusinessList(data);
            console.log("Data was fetched in [main.js]");
        }
        fetch().catch(error => { console.log("Somthing went wrong on the server.") });
    }, []);
    const onModalShow = async (item) => {
        setItemId(item.id);
        setShow(true);
    }
    const onModalHide = async () => {
        setItemId(0);
        setShow(false);
    }
    const onViewBusiness = (list) => {
        // window.location = `/detail/${list.id}`;
        history.push(`/detail/${list.id}`);
    }
    return (
        <div>
            <div className="p-2 text-center">
                <h3 className="text-primary">Main</h3>
            </div>
            <Container fluid>
                <Row className="mb-2">
                    <Col xs={12} className="p-4">
                        <Suspense fallback={<div className="text-center"><Spinner animation="border" variant="primary" /></div>}>
                            <TableContent filter={filteredItem} placeholder="Search your business by name" dataList={businessList} columnTitles={columnTitles} columnList={columnList} onEdithandler={onViewBusiness} onModalView={onModalShow} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container >
            {show && <DetailModal id={itemId} show={show} onHide={onModalHide} />}
        </div>
    );
}

export default Main;
