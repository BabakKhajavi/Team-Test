import React, { useEffect, useState, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addBusiness } from '../store/business-slice';
import DetailModalRedux from './detail-modal-redux';
const TableContent = React.lazy(() => import('./table'));
let isInitialized = true;
const apiEndPoint = "https://smoothcommerce.tech/api.json";
const MainRedux = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const businessList = useSelector(state => state.business.items);
    // use by table 
    const pageSize = 10;
    const columnTitles = ["ID", 'Business Name', 'Website', 'Adress', 'View in Routes', 'View in Modals'];
    const columnList = ["id", 'company_name', 'website', 'address'];
    const filteredItem = "company_name";
    //
    const [itemId, setItemId] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // fetch data for the first time or if page is refreshed (reloaded).
        if (!isInitialized) {
            return;
        }
        const fetch = async () => {
            const { data } = await axios.get(apiEndPoint, { 'Content-Type': 'application/json' });
            data.map(item => dispatch(addBusiness(item)));
            localStorage.setItem("BusinessList", JSON.stringify(data));
            // console.log("Data was fetched in [main-redux.js]");
            isInitialized = false;
        }
        fetch().catch(error => { console.log("Somthing went wrong on the server.") });

    }, [dispatch]);
    const handleModalShow = async (item) => {
        setItemId(item.id);
        setShow(true);
    }
    const handleModalHide = async () => {
        setItemId(0);
        setShow(false);
    }
    const handleViewBusiness = (list) => {
        // window.location = `/detailredux/${list.id}`;
        history.push(`/detailredux/${list.id}`);
    }
    return (
        <div>
            <div className="p-2 text-center">
                <h3 className="text-primary">Main (Redux)</h3>
            </div>
            <Container fluid>
                <Row className="mb-2">
                    <Col xs={12} className="p-4">
                        <Suspense fallback={<div className="text-center"><Spinner animation="border" variant="primary" /></div>}>
                            <TableContent filter={filteredItem} placeholder="Search your business by name" dataList={businessList} columnTitles={columnTitles} columnList={columnList} onEdithandler={handleViewBusiness} onModalView={handleModalShow} pageSize={pageSize} />
                        </Suspense>
                    </Col>
                </Row>
            </Container >
            {show && <DetailModalRedux id={itemId} show={show} onHide={handleModalHide} />}
        </div>
    );
}

export default MainRedux;
