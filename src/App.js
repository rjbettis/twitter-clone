import React, { Component } from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/pages/Home';

class App extends Component {
  state = {
    details: []
  };

  render() {
    return (
      <Router>
        <Container>
          <Row>
            <Col lg={2}>
              <Sidebar />
            </Col>
            <Col>
              <Route exact path="/home" component={Home} />
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default App;
