import { Routes, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Account from "./Account";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import {ProtectedRoutes} from "./ProtectedRoutes";

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
            <h1>React Authentication Tutorial</h1>
            
            <section id="navigation">
              <a href="/">Home</a>
              <a href="/free">Free Component</a>
              <a href="/auth">Auth Component</a>
            </section>
          </Col>
      </Row>

      {/* Create Routes Here */}
      <Routes>
        <Route path='/' element={<Account />} />
        <Route path='/free' element={<FreeComponent />} />
        <Route path='/auth' element={<ProtectedRoutes><AuthComponent /></ProtectedRoutes>} />
      </Routes>
    </Container>
  );
}

export default App;
