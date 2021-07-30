import './App.css';
import React, { Suspense } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
const Main = React.lazy(() => import('./components/main'));
const Detail = React.lazy(() => import('./components/detail'));
const MainRedux = React.lazy(() => import('./components/main-redux'));
const DetailRedux = React.lazy(() => import('./components/detail-redux'));
function App() {
  return (
    <Container fluid>
      <Row xs={12}>
        <Col className="m-0 p-0">
          <nav>
            <ul >
              <li>
                <NavLink activeClassName="active" to="/mainredux" replace >Main-Redux</NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/main" replace >Main</NavLink>
              </li>
            </ul>
          </nav>
        </Col>
      </Row>
      <Row >
        <Col xs={12}>
          <Suspense fallback={<div className="text-center"><Spinner animation="border" variant="primary" /></div>}>
            <Switch>
              <Route path="/detailredux/:id">
                <DetailRedux />
              </Route>
              <Route path="/mainredux">
                <MainRedux />
              </Route>
              <Route path="/detail/:id">
                <Detail />
              </Route>
              <Route path="/main">
                <Main />
              </Route>
              <Route path="/" exact>
                <Redirect to="/mainredux" />
              </Route>
              <Route path="*" exact>
                <h1>Page Not Found</h1>
              </Route>
            </Switch>
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
