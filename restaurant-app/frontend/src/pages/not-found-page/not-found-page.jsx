import {Col, Container, Row} from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <>
      <Container className={'mb-5'}>
        <Row>
          <Col>
            <div className="text-center">
              <h1>404 - Page Not Found</h1>
              <p>Sorry, the page you are looking for does not exist.</p>
              <img src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif" alt="404"/>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className={'text-center'}>
        <Row>
          <Col>
            <div className='hero-description fs-6'>
              <span>&copy; 2024 Food Delivery. All rights reserved.</span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NotFoundPage;
