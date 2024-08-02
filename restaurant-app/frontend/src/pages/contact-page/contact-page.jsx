import './contact-page.css';
import {Col, Container, Row} from "react-bootstrap";

const ContactPage = () => {
  return (
    <>
      <Container className={'pb-5'}>
        <div className="bg-body-tertiary">
          <div className='container py-5'>
            <div className='row'>
              <div className='col'>
                <div className='hero-caption text-center'>
                  <p>Contact Us</p>
                </div>
                <div className='hero-description text-center'>
                  <p>Our team is always ready to assist you. Feel free to reach out to us with any questions or
                    concerns.</p>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='hero-caption text-center'>
                  <p>Phone</p>
                </div>
                <div className='hero-description text-center'>
                  <p>Call us at 123-456-7890</p>
                </div>
              </div>
              <div className='col'>
                <div className='hero-caption text-center'>
                  <p>Email</p>
                </div>
                <div className='hero-description text-center'>
                  <p>Email us at
                    <a href="mailto:johndoe@xyz.in">johndoe@xyz.in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className='bg-body-tertiary'>
        <Row>
          <Col className='text-center'>
            <div className='hero-description fs-6'>
              <span>&copy; 2024 Food Delivery. All rights reserved.</span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContactPage;
